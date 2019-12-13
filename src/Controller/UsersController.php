<?php

namespace App\Controller;

use App\Entity\Users;
use App\Services\ReservationService;
use App\Services\UsersService;
use Doctrine\ORM\EntityManagerInterface;
use FOS\RestBundle\FOSRestBundle;
use FOS\RestBundle\Controller\Annotations as Rest;
use JMS\Serializer\SerializerBuilder;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class UsersController extends FOSRestBundle
{
    private $entityManager;

    /**
     * @param EntityManagerInterface $entityManager
     */
    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    /**
     * @Rest\Get("/api/users")
     */
    public function getUsersList()
    {
        $service = new UsersService($this->entityManager);
        $list = $service->userList();
        return new JsonResponse($list);
    }

    /**
     * @Rest\Get("/api/single-user/{id}")
     */
    public function getOneUser($id)
    {
        //TODO implement user id addition in guard
        $service = new UsersService($this->entityManager);
        $list = $service->singleUserList($id);
        return new JsonResponse($list);
    }
}
