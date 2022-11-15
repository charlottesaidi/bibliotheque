<?php

namespace App\Controller\Book;

use App\Entity\Book\Book;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Component\HttpFoundation\Request;
use App\Service\ApiService;

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

    #[Route('/book/{slug}', name: 'api_show_book')]
    public function show($slug): JsonResponse
    {
        $response = new JsonResponse();

        try {
            $repository = $this->doctrine->getRepository(Book::class);
            $book = $repository->findOneBySlug($slug);
    
            if(null == $book) {
                throw $this->createNotFoundException();
            }
    
            $response->setContent($this->api->handleCircularReference($book)) ;
    
            return $response;
        } catch(throwable $e) {
            $response->setContent($e->getMessage());
            return $response;
        } 
    }
}
