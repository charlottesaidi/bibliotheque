<?php

namespace App\Controller\Show;

use App\Entity\Show\Show;
use App\Service\ApiService;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

#[Route('api')]
class ShowController extends AbstractController
{
    public function __construct(private ManagerRegistry $doctrine, private ApiService $api) {}

    #[Route('/shows', name: 'api_shows')]
    public function index(): JsonResponse
    {
        try {
            $repository = $this->doctrine->getRepository(Show::class);

            $shows = $repository->getAll();

            if(null == $shows) {
                throw $this->createNotFoundException();
            }

            return $this->json($shows);
        } catch(throwable $e) {
            return $this->json($e->getMessage());
        }
    }
}
