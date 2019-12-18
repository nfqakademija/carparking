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

    public function reservationList()
    {
        $countParkSpaces = $this->countParkSpaces();
        $reservationList = [];
        $dateArray = $this->dateTimeProvider(7);
        foreach ($dateArray as $item) {
            $dateObject = $this->dateFromString($item);
            $reservationDateString = $dateObject->format('Y-m-d H:i:s');
            $numberReservation = $this->entityManager
                ->getRepository(Reservations::class)
                ->countReservationByDateAndWithParkSpaceId($reservationDateString);
            $numberAways = $this->entityManager
                ->getRepository(Users::class)
                ->countUsersByAwayDate($reservationDateString);
            $array = [];
            $array['date'] = $item;
            $array['availableSpots'] = $numberAways - $numberReservation;
            $array['usedSpots'] = $countParkSpaces - $array['availableSpots'];
            array_push($reservationList, $array);
        }
        return $reservationList;
    }

    private function countParkSpaces()
    {
        return $this->entityManager->getRepository(ParkSpaces::class)->countParkSpaces();
    }

    public function deleteGuestReservation($data)
    {
        foreach ($data['reservations'] as $datum) {
            $reservation = $this->entityManager->getRepository(Reservations::class)->findReservationById($datum['id']);
            if ($reservation->getParkSpace() != null) {
                $date = $reservation->getReservationDate()->format('Y-m-d H:i:s');
                $newReservation =
                    $this->entityManager
                        ->getRepository(Reservations::class)
                        ->findReservationWithoutParkSpaceByDate($date);
                if ($newReservation) {
                    $newReservation->setParkSpace($reservation->getParkSpace());
                    $this->entityManager->persist($newReservation);
                }
            }
            $this->entityManager->remove($reservation);
            $this->entityManager->flush();
        }
        return $array = ["success" => "created"];
    }


    public function makeGuestReservation($data)
    {
        $guest = $this->checkUserRole($data['id']);
        if ($guest == null) {
            return $array = ["error" => "not guest"];
        } else {
            foreach ($data['reservations'] as $value) {
                $dateObject = $this->dateFromString($value['reservationDate']);
                $reservationDateString = $dateObject->format('Y-m-d H:i:s');
                $existingReservation = $this
                    ->checkIfGuestNotCreatingExistingReservation($reservationDateString, $guest->getId());
                if ($existingReservation != null) {
                    return $array = ["error" => "user has reservations by entered date"];
                }
                $reservation = new Reservations();
                $reservation->setUser($guest);
                $dateObject = $this->dateFromString($value['reservationDate']);
                $reservation->setReservationDate($dateObject);

                $parkingSpace = $this->checkIfParkSpaceAvailableByDate($reservationDateString);
                if ($parkingSpace == null) {
                    $space = null;
                } else {
                    $reservedParkSpace = $this->checkReservedParkSpace(
                        $parkingSpace->getAwayUser()->getUserParkSpace()->getId(),
                        $reservationDateString
                    );
                    if ($reservedParkSpace) {
                        $space = null;
                    } else {
                        $space = $parkingSpace->getAwayUser()->getUserParkSpace();
                    }
                    $reservation->setParkSpace($space);
                }
                $this->entityManager->persist($reservation);
            }
            $this->entityManager->flush();
            return $array = ["success" => "created"];
        }
    }

    public function changeReservationsByProvidedArray(array $dateArray, ParkSpaces $parkSpace, string $type): void
    {
        $reservations = $this->entityManager->getRepository(Reservations::class)->getReservationsByArray($dateArray);
        foreach ($reservations as $reservation) {
            $date = $reservation->getReservationDate()->format('Y-m-d');
            $pos = array_search($date, $dateArray);
            if (($pos || $pos === 0) && $type === 'delete' && $reservation->getParkSpace() !== null) {
                if ($reservation->getParkSpace() === $parkSpace) {
                    $reservation->setParkSpace(null);
                    unset($dateArray[$pos]);
                }
            } elseif (($pos || $pos === 0) && $type === 'add' && $reservation->getParkSpace() === null) {
                $reservation->setParkSpace($parkSpace);
                unset($dateArray[$pos]);
            }
        }
        $this->entityManager->flush();
    }

    public function changeReservationsByDate(string $dateString, ParkSpaces $parkSpace): void
    {
        $reservations = $this->entityManager->getRepository(Reservations::class)->getReservationsByDate($dateString);
        foreach ($reservations as $reservation) {
            if ($reservation->getParkSpace() === null) {
                $reservation->setParkSpace($parkSpace);
            }
            $this->entityManager->flush();
        }
    }

    public function checkSpacesAtGivenDay(string $date, string $parkSpaceId)
    {
        return $this->entityManager
            ->getRepository(Reservations::class)
            ->findReservationByDateAndParkSpaceId($date, $parkSpaceId);
    }

    private function checkReservedParkSpace($parkSpaceId, $dateString)
    {
        $reservation = $this->entityManager
            ->getRepository(Reservations::class)
            ->findReservationByDateAndParkSpaceId($dateString, $parkSpaceId);
        if ($reservation) {
            return true;
        } else {
            return false;
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
                    ->findReservationByDateAndParkSpaceId($date, $item->getAwayUser()->getPermanentSpace()->getId());
                if ($parkSpaceAtReservation == null) {
                    return $item;
                }
            }
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

    private function dateFromString($dateString)
    {
        $format = '!Y-m-d';
        $date = \DateTime::createFromFormat($format, $dateString);
        return $date;
    }
}
