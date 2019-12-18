<?php

namespace App\Services;

use App\Entity\UserAway;
use App\Entity\Users;
use Doctrine\ORM\EntityManagerInterface;

class UsersService
{
    private $entityManager;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    public function userList()
    {
        $days = $this->dateTimeProvider(7);
        $userList = $this->entityManager->getRepository(Users::class)->getUsersList();
        $userArray = [];
        $single = [];

        foreach ($userList as $user) {
            $single['userId'] = $user['id'];
            $single['name'] = $user['name'];
            $single['surname'] = $user['surname'];
            $single['role'] = $user['userRole']['role'];
            $reservations = [];
            if ($user['userRole']['role'] == 'user') {
                foreach ($days as $day) {
                    $checkGuestReservation = $this->checkGuestReservationByDateAndParkId($user, $day);
                    if ($checkGuestReservation != null) {
                        array_push($reservations, $checkGuestReservation);
                    }
                }
                $single['reservations'] = $reservations;
            } else {
                $single['reservations'] = $user['reservations'];
            }
            array_push($userArray, $single);
        }
        return $userArray;
    }

    public function singleUserList($userId)
    {
        $userList = $this->entityManager->getRepository(Users::class)->getSingleUserList($userId);
        $array = [];
        foreach ($userList as $user) {
            $array['userId'] = $user['id'];
            $array['name'] = $user['name'];
            $array['surname'] = $user['surname'];
            $array['role'] = $user['userRole']['role'];
            $array['licensePlate'] = $user['licencePlate'];
            if ($user['userRole']['role'] == 'user') {
                $array['reservations'] = $this->reservationBuilder($user);
                $array['userAways'] = $user['userAways'];
            } else {
                $array['reservations'] = $user['reservations'];
                $array['userAways'] = $user['userAways'];
            }
        }
        return $array;
    }

    public function createLicensePlate($data)
    {
        $user = $this->entityManager
            ->getRepository(Users::class)
            ->getSingleUser($data['licensePlate'][0]['userId']);
        $user->setLicencePlate($data['licensePlate'][0]['licensePlate']);
        $this->entityManager->flush();
        return ['success' => 'created'];
    }

    public function deleteLicensePlate($data)
    {
        $user = $this->entityManager
            ->getRepository(Users::class)
            ->getSingleUser($data['licensePlate'][0]['userId']);
        $user->setLicencePlate(null);
        $this->entityManager->flush();
        return ['success' => 'created'];
    }

    private function reservationBuilder($user)
    {
        $days = $this->dateTimeProvider(7);
        $reservations = [];
        foreach ($days as $day) {
            $array = $this->checkGuestReservationByDateAndParkId($user, $day);
            if ($array != null) {
                $reservation = [];
                $reservation['date'] = $array[0];
                $reservation['userSpot'] = $user['permanentSpace']['number'];
                array_push($reservations, $reservation);
            }
        }
        return $reservations;
    }

    private function checkGuestReservationByDateAndParkId($user, $currentDate)
    {
        $array = [];
        foreach ($user['userAways'] as $userAway) {
            if (($userAway['awayEndDate'] != null) && ($userAway['awayStartDate'] != null)) {
                $startDate = $userAway['awayStartDate']->format('Y-m-d');
                $endDate = $userAway['awayEndDate']->format('Y-m-d');
                if ($currentDate >= $startDate && $currentDate <= $endDate) {
                    $currentDate = null;
                }
            }
        }
        if ($currentDate != null) {
            array_push($array, $currentDate);
        }
        return $array;
    }

    private function dateTimeProvider($days)
    {
        $reservationDateArray = [];
        for ($i = 0; $i < $days; $i++) {
            $date = new \DateTime("now");
            $date->modify("+$i day");
            array_push($reservationDateArray, $date->format('Y-m-d'));
        }
        return $reservationDateArray;
    }
}

