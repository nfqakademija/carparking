<?php

namespace App\Services;

use App\Entity\ParkSpaces;
use App\Entity\Reservations;
use App\Entity\UserAway;
use App\Entity\Users;
use Doctrine\ORM\EntityManagerInterface;

class ReservationService
{
    private $entityManager;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    public function makeGuestReservation($array)
    {
        $guest = $this->checkUserRole($array['id']);
        if ($guest == null) {
            echo "not guest";
            //TODO return statement no guest found by entered id
        } else {
            foreach ($array['reservations'] as $value) {
                $dateObject = $this->dateFromString($value['reservation_date']);
                $reservationDateString = $dateObject->format('Y-m-d H:i:s');
                //TODO check if guest are not creating existing reservation
                $existingReservation = $this
                    ->checkIfGuestNotCreatingExistingReservation($reservationDateString, $guest->getId());
                if ($existingReservation != null) {
                    //TODO return statement for existing reservations
                    echo "error user has reservations by entered date";
                    die;
                }
                $reservation = new Reservations();
                $reservation->setUser($guest);
                $dateObject = $this->dateFromString($value['reservation_date']);
                $reservation->setReservationDate($dateObject);
                $parkingSpace = $this->checkIfParkSpaceAvailableByDate($reservationDateString);
                if ($parkingSpace == null) {
                    $reservation->setParkSpace(null);
                } else {
                    $reservation->setParkSpace($parkingSpace->getAwayUser()->getUserParkSpace());
                }
                $this->entityManager->persist($reservation);
            }
            $this->entityManager->flush();
        }
    }

    private function checkUserRole($id)
    {
        $guest = $this->entityManager->getRepository(Users::class)->findUserByRoleGuestAndId($id);
        return $guest;
    }

    private function checkIfParkSpaceAvailableByDate($date)
    {
        $away = $this->entityManager->getRepository(UserAway::class)->findUserAwayByDate($date);
        if ($away != null) {
            foreach ($away as $item) {
                $parkSpaceAtReservation = $this->entityManager
                    ->getRepository(Reservations::class)
                    ->findReservationByDateAndParkSpaceId($date, $item->getAwayUser()->getPermanentSpace());
                if ($parkSpaceAtReservation != null) {
                    $away = null;
                } else {
                    continue;
                }
            }
            return $away;
        }
    }

    private function checkIfGuestNotCreatingExistingReservation($date, $guestId)
    {
        return $this->entityManager
            ->getRepository(Reservations::class)
            ->findReservationByDateAndUserId($date, $guestId);
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
