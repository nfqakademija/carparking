<?php

namespace App\Controller;

use App\Entity\Reservations;
use App\Entity\Users;
use Doctrine\ORM\EntityManagerInterface;
use FOS\RestBundle\FOSRestBundle;
use JMS\Serializer\SerializerBuilder;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use FOS\RestBundle\Controller\Annotations as Rest;

class ReservationController extends FOSRestBundle
{
    private $entityManager;

    /**
     * ReservationController constructor.
     * @param EntityManagerInterface $entityManager
     */
    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    /**
     * @Rest\Get("/api/reservations")
     */
    public function index()
    {
        $data = $this->entityManager->getRepository(Users::class)->findUsers();

        $serializer = SerializerBuilder::create()->build();
        $entity = $serializer->serialize($data, 'json');
        $response = new Response($entity);
        $response->headers->set('Content-Type', 'application/json');

        return $response;

    }



}
