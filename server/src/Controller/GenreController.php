<?php

namespace App\Controller;

use App\Entity\Genre;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Component\HttpFoundation\Request;
use App\Service\ApiService;

#[Route('api')]
class GenreController extends AbstractController
{
    public function __construct(private ManagerRegistry $doctrine, private ApiService $api)
    {}
    
    #[Route('/genres', name: 'app_genre')]
    public function index(): JsonResponse
    {
        $repository = $this->doctrine->getRepository(Genre::class);

        $genres = $repository->findAll();

        if(null == $genres) {
            throw $this->createNotFoundException();
        }

        return $this->json($this->api->handleCircularReference($genres));
    }
}
