<?php

namespace App\Controller;

use App\Entity\Reservations;
use App\Entity\UserAway;
use App\Entity\Users;
use App\Services\ReservationService;
use Doctrine\ORM\EntityManagerInterface;
use FOS\RestBundle\FOSRestBundle;
use JMS\Serializer\SerializerBuilder;
use Symfony\Component\HttpFoundation\Response;
use FOS\RestBundle\Controller\Annotations as Rest;

class ReservationController extends FOSRestBundle
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
     * @Rest\Get("/api/reservations")
     */
    public function index()
    {
        $data = $this->entityManager->getRepository(Reservations::class)->findAll();
        $json = $this->serialize($data);
        $response = new Response($json);
        $response->headers->set('Content-Type', 'application/json');
        $response->getStatusCode();
        return $response;
    }

    /**
     * @Rest\Get("/api/make-reservation")
     * @throws \Exception
     */
    public function make()
    {
        $service = new ReservationService($this->entityManager);

        $service->make(2, 'user');
//        $service->make();

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
        $response = new Response();
        return $response;
    }





    private function serialize($data)
    {
        $serializer = SerializerBuilder::create()->build();
        $json = $serializer->serialize($data, 'json');
        return $json;
    }
}
