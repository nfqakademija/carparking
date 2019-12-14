<?php

namespace App\Services;

use App\Entity\Notifications;
use App\Entity\Reservations;
use App\Entity\UserAway;
use Doctrine\ORM\EntityManagerInterface;

class SwitchService
{
    private $entityManager;
    private $userAwayService;

    public function __construct(EntityManagerInterface $entityManager, UserAwayService $userAwayService)
    {
        $this->entityManager = $entityManager;
    }

    public function makeParkSpaceSwitch($notificationId)
    {
        $data = $this->entityManager->getRepository(Notifications::class)->findNotificationById($notificationId);
        $userId = $data->getUser()->getId();
        $guestId = $data->getGuest()->getId();
        $requestDate = $data->getRequestDate()->format('Y-m-d');
        $check = $this->userAwayService->checkUserAwayDuplicates($requestDate, $requestDate, $userId);
        if ($check) {
            return $array = ['error => duplicate'];
        }
        $parkSpace = $data->getUser()->getUserParkSpace();
        $reservation = $this->getReservationByGuestId($requestDate, $guestId);
        $reservation->setParkSpace($parkSpace);

        $userAway = new UserAway();
        $userAway->setAwayUser($data->getUser());
        $userAway->setAwayStartDate($data->getRequestDate());
        $userAway->setAwayEndDate($data->getRequestDate());
        $this->entityManager->persist($userAway);

        $this->entityManager->flush();
    }

    private function getReservationByGuestId($requestDate, $guestId)
    {
        return $this->entityManager
            ->getRepository(Reservations::class)
            ->findReservationByDateAndUserId($requestDate, $guestId);
    }
}
