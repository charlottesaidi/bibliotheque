<?php

namespace App\Controller;

use App\Entity\Book\Book;
use App\Entity\File;
use App\Entity\Genre;
use App\Service\ApiService;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

#[Route('api')]
class BookController extends AbstractController
{
    public function __construct(private ManagerRegistry $doctrine, private ApiService $api) {}

    #[Route('/books', name: 'api_books')]
    public function index(Request $request): JsonResponse
    {
        try {
            $repository = $this->doctrine->getRepository(Book::class);

            $requestParam = $request->query;

            $books = $requestParam ? $repository->getSearchedBooks($requestParam->get('title'), $requestParam->get('author')) : $repository->getAll();

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

            $fileName = explode('.', json_decode($data['file'])->name)[0];
            $fileType = explode('.', json_decode($data['file'])->name)[1];
            $cover = json_decode($data['cover']);

            $bookRepo = $this->doctrine->getRepository(Book::class);
            $fileRepo = $this->doctrine->getRepository(File::class);
            $genreRepo = $this->doctrine->getRepository(Genre::class);

            $file = $fileRepo->createFile(
                $fileType,
                $fileName,
                $fileType,
                json_decode($data['file'])->size
            );

            $genre = $genreRepo->findOneBy(['name' => $data['genre']]);

            $book = $bookRepo->createBook(
                $data['author'],
                $data['title'],
                $file,
                $cover->path,
                $genre,
                $data['publicationDate'].'-01-01'
            );

            $response->setContent($book->getTitle().' uploadé avec succès');
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
