<?php

namespace App\Controller;

use App\Services\NotificationService;
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
     * @Rest\Get("/api/notifications/{guestId}")
     * @param $guestId
     * @return JsonResponse
     */
    public function show($guestId)
    {
        $service = new NotificationService($this->entityManager);
        $response = $service->userNotification($guestId);
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
     * @return JsonResponse
     */
    public function accept($notificationId)
    {
        $userAwayService = new UserAwayService($this->entityManager);
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
     * @return JsonResponse
     */
    public function cancelSwitch($notificationId)
    {
        $userAwayService = new UserAwayService($this->entityManager);
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
