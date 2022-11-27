<?php

namespace App\Controller;

use App\Entity\Movie\Movie;
use App\Service\ApiService;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Throwable;

#[Route('api')]
class MovieController extends AbstractController
{
    public function __construct(private ManagerRegistry $doctrine) {}

    #[Route('/movies', name: 'api_movies')]
    public function index(): JsonResponse
    {
        try {
            $repository = $this->doctrine->getRepository(Movie::class);

            $movies = $repository->getAll();

            if(null == $movies) {
                throw $this->createNotFoundException();
            }

            return $this->json($movies);
        } catch(throwable $e) {
            return $this->json($e->getMessage());
        }
    }
}
