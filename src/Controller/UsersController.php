<?php

namespace App\Controller;

use App\Entity\ParkSpaces;
use App\Entity\Reservations;
use App\Entity\Roles;
use App\Entity\UserAway;
use App\Entity\Users;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class UsersController extends AbstractController
{
    /**
     * @Route("/api/users", name="users")
     * @param EntityManagerInterface $entityManager
     * @return JsonResponse
     */
    public function index(EntityManagerInterface $entityManager)
    {
        $repository = $this->getDoctrine()->getRepository(Users::class);
        $data = $repository->findAll();
//
//        $response = new Response($data);
//        $response->headers->set('Content-Type', 'application/json');
//        return var_dump($response);

        return new JsonResponse($data);

    }
}
