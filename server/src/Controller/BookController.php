<?php

namespace App\Controller;

use App\Entity\Book\Book;
use App\Entity\File;
use App\Entity\Genre;
use App\Service\ApiService;
use App\Service\FileUploader;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\File\Exception\FileException;

#[Route('api')]
class BookController extends AbstractController
{
    public function __construct(private ManagerRegistry $doctrine, private ApiService $api, private FileUploader $fileUploader) {}

    #[Route('/books', name: 'api_books')]
    public function index(Request $request): JsonResponse
    {
        try {
            $bookRepository = $this->doctrine->getRepository(Book::class);
            $genreRepository = $this->doctrine->getRepository(Genre::class);

            $genre = $genreRepository->findOneBy(['name' => $request->query->get('genre')]);

            $books = $request->query ? $bookRepository->getSearchedBooks($request->query->get('title'), $request->query->get('author'), $genre) : $bookRepository->getAll();

            if(null == $books) {
                throw $this->createNotFoundException();
            }
    
            return $this->json($books);
        } catch(throwable $e) {
            return $this->json($e->getMessage());
        }
    }

    #[Route('/book/create', name: 'api_create_book')]
    public function create(Request $request): JsonResponse
    {
        $response = new JsonResponse();

        try {
            $data = $request->request->all();

            $bookRepo = $this->doctrine->getRepository(Book::class);
            $fileRepo = $this->doctrine->getRepository(File::class);
            $genreRepo = $this->doctrine->getRepository(Genre::class);

            $uploadedCover = $this->fileUploader->uploadFile($request->files->get('cover'), $this->getParameter('books_cover_directory'));
            $uploadedFile = $this->fileUploader->uploadFile($request->files->get('file'), $this->getParameter('ebooks_directory'));

            $file = $fileRepo->createFile(
                $uploadedFile['extension'],
                $uploadedFile['name'],
                $uploadedFile['extension'],
                $uploadedFile['size'],
            );

            $genre = $genreRepo->findOneBy(['name' => $data['genre']]);

            $book = $bookRepo->createBook(
                $data['author'],
                $data['title'],
                $file,
                $uploadedCover['name'],
                $genre,
                $data['publicationDate'].'-01-01'
            );

            $response->setContent($book->getTitle().' uploadé avec succès');
            return $response;
        } catch (FileException $e) {
            $response->setContent($e->getMessage());
            return $response;
        } catch(throwable $e) {
            $response->setContent($e->getMessage());
            return $response;
        }
    }

    #[Route('/book/{slug}', name: 'api_show_book')]
    public function show($slug): JsonResponse
    {
        $response = new JsonResponse();

        try {
            $repository = $this->doctrine->getRepository(Book::class);
            $book = $repository->findOneBySlug($slug);
    
            if(null == $book) {
                throw $this->createNotFoundException('Ressource introuvable');
            }
    
            $response->setContent($this->api->handleCircularReference($book)) ;
    
            return $response;
        } catch(throwable $e) {
            $response->setContent($e->getMessage());
            return $response;
        } 
    }

    #[Route('/book/{id}/delete', name: 'api_delete_book')]
    public function delete($id): JsonResponse
    {
        $response = new JsonResponse();

        try {
            $repository = $this->doctrine->getRepository(File::class);
            $file = $repository->find($id);

            if(null == $file) {
                throw $this->createNotFoundException('Ressource introuvable');
            }

            $repository->remove($file, true);

            $response->setContent('Livre supprimé');
            return $response;
        }  catch(throwable $e) {
            $response->setContent($e->getMessage());
            return $response;
        }
    }
}
