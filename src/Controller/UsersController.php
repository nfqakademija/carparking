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
     * @Rest\Get("/api/users/{id}")
     */
    public function getOneUser($id)
    {
        $data = $this->entityManager->getRepository(Users::class)->findById($id);
        $json = $this->serialize($data);
        $response = new Response($json);
        $response->headers->set('Content-Type', 'application/json');
        return $response;
    }

    private function serialize($data)
    {
        $serializer = SerializerBuilder::create()->build();
        $json = $serializer->serialize($data, 'json');
        return $json;
    }
}
