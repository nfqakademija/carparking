<?php

namespace App\Controller;

use App\Entity\UserAway;
use App\Services\ReservationService;
use App\Services\UserAwayService;
use Doctrine\ORM\EntityManagerInterface;
use FOS\RestBundle\Controller\Annotations as Rest;
use FOS\RestBundle\FOSRestBundle;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class UserAwayController extends FOSRestBundle
{

    private $entityManager;
    private $reservationService;

    /**
     * @param EntityManagerInterface $entityManager
     * @param ReservationService $reservationService
     */
    public function __construct(EntityManagerInterface $entityManager, ReservationService $reservationService)
    {
        $this->entityManager = $entityManager;
        $this->reservationService = $reservationService;
    }

    /**
     * @Rest\Get("/api/useraway")
     */
    public function getUserAwayList()
    {
        $data = $this->entityManager->getRepository(UserAway::class)->findAll();
        $json = $this->serialize($data);
        $response = new Response($json);
        $response->headers->set('Content-Type', 'application/json');
        $response->getStatusCode();
        return $response;
    }

    /**
     * @Rest\Get("/api/useraway/{id}")
     */
    public function getSingleUserAway($id)
    {
        $awayService = new UserAwayService($this->entityManager, $this->reservationService);
        $response = $awayService->getSingle($id);
        return new JsonResponse($response);
    }

    /**
     * @Rest\Post("/api/useraway")
     * @param Request $request
     * @return JsonResponse
     */
    public function postUserAway(Request $request)
    {
        $content = $request->getContent();
        $dataArray = json_decode($content, true);
        $reservationService = new ReservationService($this->entityManager);
        $awayService = new UserAwayService($this->entityManager, $reservationService);
        $response = $awayService->post($dataArray);
        return new JsonResponse($response);
    }

    /**
     * @Rest\Put("/api/useraway")
     * @param Request $request
     * @return JsonResponse
     */
    public function updateUserAway(Request $request)
    {
        $content = $request->getContent();
        $dataArray = json_decode($content, true);
        $reservationService = new ReservationService($this->entityManager);
        $awayService = new UserAwayService($this->entityManager, $reservationService);
        $response = $awayService->put($dataArray);
        return new JsonResponse($response);
    }

    /**
     * @Rest\Delete("/api/useraway")
     * @param Request $request
     * @return JsonResponse
     */
    public function deleteUserAway(Request $request)
    {
        $content = $request->getContent();
        $dataArray = json_decode($content, true);
        $reservationService = new ReservationService($this->entityManager);
        $awayService = new UserAwayService($this->entityManager, $reservationService);
        $response = $awayService->delete($dataArray);
        return new JsonResponse($response);
    }
}
