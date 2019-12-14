<?php


namespace App\Services;

use App\Entity\Notifications;
use App\Entity\Users;
use Doctrine\ORM\EntityManagerInterface;

class NotificationService
{
    private $entityManager;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    public function notificationList()
    {

    }

    public function userNotification()
    {

    }

    public function createNotification($data)
    {
        $checkDuplicate = $this->checkDuplicate($data);

        if ($checkDuplicate) {
            //TODO checking for date interval
            return $array = ['error' => 'duplicate'];
        }

        $notification = new Notifications();
        $guest = $this->findUserById($data['guestId']);
        if ($guest->getUserRole()->getRole() != 'guest') {
            return $array = ['error' => 'not guest'];
        }
        $notification->setGuest($guest);

        $user = $this->findUserById($data['userId']);
        if ($user->getUserRole()->getRole() != 'user') {
            return $array = ['error' => 'not user'];
        }
        $notification->setUser($user);
        $requestDate = $this->dateFromString($data['requestDate']);
        $notification->setRequestDate($requestDate);
        $notification->setAccepted(0);
        $notification->setDelivered(0);
        $this->entityManager->persist($notification);
        $this->entityManager->flush();
        return $array = ['success' => 'success'];
    }

    private function findUserById($userId)
    {
        $user = $this->entityManager->getRepository(Users::class)->findUserById($userId);
        return $user;
    }

    private function dateFromString($dateString)
    {
        $format = '!Y-m-d';
        $date = \DateTime::createFromFormat($format, $dateString);
        return $date;
    }

    private function checkDuplicate($dataArray)
    {
        return $this->entityManager->getRepository(Notifications::class)->checkDuplicateEntry($dataArray);
    }

}