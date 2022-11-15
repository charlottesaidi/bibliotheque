<?php

namespace App\Controller;

use App\Entity\Book\Book;
use App\Entity\Movie\Movie;
use App\Entity\Show\Show;
use App\Service\ApiService;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

#[Route('api')]
class IndexController extends AbstractController
{
    public function __construct(private ManagerRegistry $doctrine, private ApiService $api) {}

    #[Route('/library/latest', name: 'api_latest_publications')]
    public function index(Request $request): JsonResponse
    {
        try {
            $limit = $request->query->get('limit');

            $bookRepository = $this->doctrine->getRepository(Book::class);
            $movieRepository = $this->doctrine->getRepository(Movie::class);
            $showRepository = $this->doctrine->getRepository(Show::class);

            $latestBooks = $bookRepository->getLastUploadedBooks($limit);
            $latestMovies = $movieRepository->getLastUploadedMovies($limit);
            $latestShows = $showRepository->getLastUploadedShows($limit);

            $publications = [
                [
                    'name' => 'eBooks',
                    'category' => 'livres',
                    'items' => $latestBooks
                ],
                [
                    'name' => 'Films',
                    'category' => 'films',
                    'items' => $latestMovies,
                ],
                [
                    'name' => 'Séries',
                    'category' => 'series',
                    'items' => $latestShows,
                ]
            ];

            return $this->json($publications);
        } catch(throwable $e) {
            return $this->json($e->getMessage());
        }
    }
}