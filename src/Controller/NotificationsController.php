<?php

namespace App\Controller;

use App\Services\NotificationService;
use App\Services\ReservationService;
use App\Services\SwitchService;
use App\Services\UserAwayService;
use Doctrine\ORM\EntityManagerInterface;
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
     * @Rest\Get("/api/notifications")
     * @return JsonResponse
     */
    public function all()
    {
        $service = new NotificationService($this->entityManager);
        $response = $service->notificationList();
        return new JsonResponse($response);
    }

    /**
     * @Rest\Get("/api/notifications/{userId}/{role}")
     * @param $userId
     * @param $role
     * @return JsonResponse
     */
    public function show($userId, $role)
    {
        $service = new NotificationService($this->entityManager);
        $response = $service->userNotification($userId, $role);
        return new JsonResponse($response);
    }

    /**
     * @Rest\Post("/api/notifications")
     * @param Request $request
     * @return JsonResponse
     */
    public function create(Request $request)
    {
        $content = $request->getContent();
        $dataArray = json_decode($content, true);

        $service = new NotificationService($this->entityManager);
        $response = $service->createNotification($dataArray);
        return new JsonResponse($response);
    }

    /**
     * @Rest\Put("/api/notifications")
     * @param Request $request
     * @return JsonResponse
     */
    public function update(Request $request)
    {
        $content = $request->getContent();
        $dataArray = json_decode($content, true);

        $service = new NotificationService($this->entityManager);
        $response = $service->editNotification($dataArray);
        return new JsonResponse($response);
    }

    /**
     * @Rest\Post("/api/notification-accept/{notificationId}")
     * @param $notificationId
     * @return JsonResponse
     */
    public function accept($notificationId)
    {
        $reservationService = new ReservationService($this->entityManager);
        $userAwayService = new UserAwayService($this->entityManager, $reservationService);
        $service = new SwitchService($this->entityManager, $userAwayService);
        $response = $service->makeParkSpaceSwitch($notificationId);
        if ($response = ['success' => 'switched']) {
            $notification = new NotificationService($this->entityManager);
            $data = ["notificationId" => $notificationId, "accepted" => 1];
            $notification->editNotification($data);
        }
        return new JsonResponse($response);
    }

    /**
     * @Rest\Delete("/api/notification-cancel/{notificationId}")
     * @param $notificationId
     * @return JsonResponse
     */
    public function cancelSwitch($notificationId)
    {
        $reservationService = new ReservationService($this->entityManager);
        $userAwayService = new UserAwayService($this->entityManager, $reservationService);
        $service = new SwitchService($this->entityManager, $userAwayService);
        $response = $service->cancelParkSpaceSwitch($notificationId);
        if ($response = ['success' => 'canceled']) {
            $notification = new NotificationService($this->entityManager);
            $data = ["notificationId" => $notificationId, "acceptedAndCanceled" => 1];
            $notification->editNotification($data);
        }
        return new JsonResponse($response);
    }
}
