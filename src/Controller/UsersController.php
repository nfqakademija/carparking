<?php

namespace App\Controller;

use App\Entity\Users;
use Doctrine\ORM\EntityManagerInterface;
use FOS\RestBundle\FOSRestBundle;
use FOS\RestBundle\Controller\Annotations as Rest;
use JMS\Serializer\SerializerBuilder;
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
        $article = $this->entityManager->getRepository(Users::class)->findAll();
        $serializer = SerializerBuilder::create()->build();
        $entity = $serializer->serialize($article, 'json');
        $response = new Response($entity);
        $response->headers->set('Content-Type', 'application/json');

        return $response;
    }
}
