<?php

namespace App\Services;

use App\Entity\ParkSpaces;
use App\Entity\Reservations;
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
        //TODO date dynamic provider
        $days = $this->dateTimeProvider(7);
        $userList = $this->entityManager->getRepository(Users::class)->getUsersList();
        $userArray = [];
        $single = [];

        foreach ($userList as $user) {
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
        return $array = ['success' => 'success'];
    }

    public function deleteLicensePlate($data)
    {
        $user = $this->entityManager
            ->getRepository(Users::class)
            ->getSingleUser($data['licensePlate'][0]['userId']);
        $user->setLicencePlate(null);
        $this->entityManager->flush();
        return $array = ['success' => 'success'];
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

    private function userAwayTimeArray($id)
    {
        $away = $this->entityManager->getRepository(UserAway::class)->getUserAwayByUserId($id);
        $array = [];
        foreach ($away as $value) {
            $awayStart = $value['awayStartDate'];
            $awayEnd = $value['awayEndDate'];

            $endObject = new \DateTime($awayEnd->format('Y-m-d'));
            $endObject->modify("+1 day");
            $period = new \DatePeriod(
                new \DateTime($awayStart->format('Y-m-d')),
                new \DateInterval('P1D'),
                $endObject
            );
            foreach ($period as $string) {
                array_push($array, $string->format('Y-m-d'));
            }
        }
        return $array;
    }

    private function dateFromString($dateString)
    {
        $format = '!Y-m-d';
        $date = \DateTime::createFromFormat($format, $dateString);
        return $date;
    }
}
