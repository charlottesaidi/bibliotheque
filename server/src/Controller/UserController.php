<?php

namespace App\Controller;

use Doctrine\Persistence\ManagerRegistry;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use App\Entity\User;
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;

#[Route('api')]
class UserController extends AbstractController
{
    public function __construct(
        private ManagerRegistry $doctrine,
        private UserPasswordHasherInterface $passwordHasher,
        private JWTTokenManagerInterface $JWTManager
    ) {}

    #[Route('/user/reset-password', name: 'app__reset_password')]
    public function resetPassword(Request $request): JsonResponse
    {
        $response = new JsonResponse();

        try {
            $userData = $request->request->all();

            $user = $this->doctrine->getRepository(User::class)->findOneBy(['email' => $userData['user_email']]);

            if(null == $user) {
                throw $this->createNotFoundException('Aucun utilisateur n\'a été trouvé avec ce token');
            }

            if($userData['new_email'] !== '') {
                $user->setEmail($userData['new_email']);
            }

            if($userData['new_password'] !== '') {
                if (!$this->passwordHasher->isPasswordValid($user, $userData['password'])) {
                    throw new AccessDeniedHttpException('L\'ancien mot de passe est incorrect');
                } else {
                    $user->setPassword($this->passwordHasher->hashPassword(
                        $user,
                        $userData['new_password']
                    ));
                }
            }

            $this->doctrine->getManager()->flush();

            $authenticationSuccessHandler = $this->container->get('lexik_jwt_authentication.handler.authentication_success');
            return $authenticationSuccessHandler->handleAuthenticationSuccess($user, $this->JWTManager->create($user));
        } catch(throwable $e) {
            $response->setContent($e->getMessage());
            return $response;
        }
    }
}
