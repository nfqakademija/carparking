<?php

namespace App\Services;

use App\Entity\Reservations;
use App\Entity\UserAway;
use App\Entity\Users;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Response;

class ReservationService
{
    private $entityManager;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    public function updateOrDeleteReservation($clientId, $parkspaceId)
    {
        $data = $this->entityManager
            ->getRepository(Reservations::class)
            ->reservationByParkIdAndByUserId($clientId, $parkspaceId);
        $awayArray = $this->userAwayTimeArray($clientId);

        $user = $this->entityManager->getRepository(Users::class)->checkId($clientId);

        foreach ($data as $value) {
            $check = $value->getReservationDate()->format('Y-m-d');
            if (in_array($check, $awayArray)) {
                $value->setUser(null);
                $value->setParkSpace($user->getUserParkSpace());
            } else {
                $value->setUser($user);
                $value->setParkSpace($user->getUserParkSpace());
            }
        }
        $this->entityManager->flush();
    }

    public function make($clientId = null)
    {
        $reservationDateArray = $this->dateTimeProvider(7);
        if ($clientId == null) {
            $data = $this->entityManager->getRepository(Users::class)->findUsers();
        } else {
            $data = $this->entityManager->getRepository(Users::class)->findUserById($clientId);

            foreach ($data as $entry) {
                $id = $entry->getId();
                $userAwayTimeArray = $this->userAwayTimeArray($id);

                foreach ($reservationDateArray as $reservationDate) {
                    if ($clientId == null) {
                        $reservation = new Reservations();
                        if (in_array($reservationDate, $userAwayTimeArray)) {
                            $reservation->setParkSpace($entry->getPermanentSpace());
                        } else {
                            $reservation->setUser($entry);
                            $reservation->setParkSpace($entry->getPermanentSpace());
                        }
                        $date = $this->dateFromString($reservationDate);
                        $reservation->setReservationDate($date);
                        $this->entityManager->persist($reservation);
                    } else {
                        $clientReservation = $this->entityManager
                            ->getRepository(Reservations::class)
                            ->reservationsByArrayAndId($userAwayTimeArray, $clientId);
                        foreach ($clientReservation as $value) {
                            $value->setUser(null);
                        }
                    }
                }
            }
        }
        $this->entityManager->flush();
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
        $away = $this->entityManager->getRepository(UserAway::class)->getAwaysByUserId($id);
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
