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
     * @Route("/users", name="users")
     * @param EntityManagerInterface $entityManager
     * @return Response
     */
    public function index(EntityManagerInterface $entityManager)
    {
        $repository = $this->getDoctrine()->getRepository(Reservations::class);
//        $data = $repository->findAll();
//
        return new JsonResponse($repository->findAll());

//        return $this->render('users/index.html.twig');


    }
}
