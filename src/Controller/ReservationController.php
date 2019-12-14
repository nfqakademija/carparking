<?php

namespace App\Controller;

use App\Services\ReservationService;
use Doctrine\ORM\EntityManagerInterface;
use FOS\RestBundle\FOSRestBundle;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
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
        $service = new ReservationService($this->entityManager);
        $service->reservationList();
        return new JsonResponse($service->reservationList());
    }


    /**
     * @Rest\Post("/api/reservations")
     */
    public function createReservation(Request $request)
    {
        $content = $request->getContent();
        $dataArray = json_decode($content, true);
        $service = new ReservationService($this->entityManager);
        $response = $service->makeGuestReservation($dataArray);
        return new JsonResponse($response);
    }

    /**
     * @Rest\Delete("/api/reservations")
     */
    public function deleteReservation(Request $request)
    {
        $content = $request->getContent();
        $dataArray = json_decode($content, true);
        $service = new ReservationService($this->entityManager);
        $response = $service->deleteGuestReservation($dataArray);
        return new JsonResponse($response);
    }
}
