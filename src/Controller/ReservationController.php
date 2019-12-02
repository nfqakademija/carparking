<?php

namespace App\Controller;

use App\Entity\Reservations;
use App\Entity\UserAway;
use App\Entity\Users;
use App\Services\ReservationService;
use Doctrine\ORM\EntityManagerInterface;
use FOS\RestBundle\FOSRestBundle;
use JMS\Serializer\SerializerBuilder;
use Symfony\Component\HttpFoundation\Response;
use FOS\RestBundle\Controller\Annotations as Rest;

class ReservationController extends FOSRestBundle
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
     * @Rest\Get("/api/reservations")
     */
    public function index()
    {
        $data = $this->entityManager->getRepository(Reservations::class)->findAll();
        $json = $this->serialize($data);
        $response = new Response($json);
        $response->headers->set('Content-Type', 'application/json');
        $response->getStatusCode();
        return $response;
    }

    /**
     * @Rest\Get("/api/make-reservation")
     * @throws \Exception
     */
    public function make()
    {
        $service = new ReservationService($this->entityManager);

        $service->make();
//        $service->make();
    }





    private function serialize($data)
    {
        $serializer = SerializerBuilder::create()->build();
        $json = $serializer->serialize($data, 'json');
        return $json;
    }
}
