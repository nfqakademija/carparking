<?php

namespace App\Controller;

use App\Services\NotificationService;
use App\Services\ReservationService;
use App\Services\SwitchService;
use App\Services\UserAwayService;
use Doctrine\ORM\EntityManagerInterface;
use FOS\RestBundle\Tests\Fixtures\User;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use FOS\RestBundle\Controller\Annotations as Rest;

class NotificationsController extends AbstractController
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
     * @Rest\Post("/api/notifications")
     * @param Request $request
     * @return JsonResponse
     */
    public function index(Request $request)
    {
        $content = $request->getContent();
        $dataArray = json_decode($content, true);

        $service = new NotificationService($this->entityManager);
        $response = $service->createNotification($dataArray);
        return new JsonResponse($response);
    }

    /**
     * @Rest\Post("/api/notification-accept/{id}")
     * @param Request $request
     * @return JsonResponse
     */
    public function accept($id)
    {
        $userAwayService = new UserAwayService($this->entityManager);
        $reservationService = new ReservationService($this->entityManager);
        $service = new SwitchService($this->entityManager, $userAwayService, $reservationService);
        $response = $service->makeParkSpaceSwitch($id);
        return new JsonResponse($response);
    }


}
