<?php

namespace App\Controller;

use App\Entity\Reservations;
use App\Entity\UserAway;
use App\Entity\Users;
use Doctrine\ORM\EntityManagerInterface;
use FOS\RestBundle\FOSRestBundle;
use JMS\Serializer\SerializerBuilder;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use FOS\RestBundle\Controller\Annotations as Rest;

class ReservationController extends FOSRestBundle
{
    private $entityManager;

    /**
     * ReservationController constructor.
     * @param EntityManagerInterface $entityManager
     */
    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    /**
     * @Rest\Get("/api/reservations")
     * @throws \Exception
     */
    public function index()
    {
        $data = $this->entityManager->getRepository(Users::class)->findUsers();
        $reservationDateArray = $this->dateTimeProvider(7);

        foreach ($data as $entry) {
            $id = $entry->getId();
            $userAwayTimeArray = $this->userAwayTimeArray($id);
            foreach ($reservationDateArray as $reservationDate) {
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
            }
            $this->entityManager->flush();
        }
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
        $format = 'Y-m-d';
        $date = \DateTime::createFromFormat($format, $dateString);
        return $date;
    }


//$serializer = SerializerBuilder::create()->build();
//$entity = $serializer->serialize($data, 'json');
//$response = new Response($entity);
//$response->headers->set('Content-Type', 'application/json');
//
//return $response;
//
//}


}
