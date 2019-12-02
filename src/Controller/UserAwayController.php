<?php

namespace App\Controller;

use App\Entity\UserAway;
use App\Entity\Users;
use App\Services\ReservationService;
use Doctrine\ORM\EntityManagerInterface;
use FOS\RestBundle\Controller\Annotations as Rest;
use FOS\RestBundle\FOSRestBundle;
use JMS\Serializer\SerializerBuilder;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class UserAwayController extends FOSRestBundle
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
     * @Rest\Get("/api/useraway")
     */
    public function getUserAwayList()
    {
        $data = $this->entityManager->getRepository(UserAway::class)->findAll();
        $json = $this->serialize($data);
        $response = new Response($json);
        $response->headers->set('Content-Type', 'application/json');
        $response->getStatusCode();
        return $response;
    }

    /**
     * @Rest\Get("/api/useraway/{id}")
     */

    public function getSingleUserAway($id)
    {
        $data = $this->entityManager->getRepository(UserAway::class)->checkByUserId($id);
        $json = $this->serialize($data);
        $response = new Response($json);
        $response->headers->set('Content-Type', 'application/json');
        $response->getStatusCode();
        return $response;
    }


    /**
     * @Rest\Post("/api/useraway")
     * @param Request $request
     */
    public function postUserAway(Request $request)
    {

        $content = $request->getContent();
        $dataArray = json_decode($content, true);

        $user = $this->entityManager->getRepository(Users::class)->checkId($dataArray['id']);
        if (!$user) {
        } else {
            foreach ($dataArray['away_date'] as $value) {
                $userAway = new UserAway();
                $format = '!Y-m-d';
                $dateStart = \DateTime::createFromFormat($format, $value['away_start_date']);
                $dateEnd = \DateTime::createFromFormat($format, $value['away_end_date']);
                $userAway->setAwayStartDate($dateStart);
                $userAway->setAwayEndDate($dateEnd);
                $userAway->setAwayUser($user);
                $this->entityManager->persist($userAway);
            }
            $this->entityManager->flush();
        }
        $service = new ReservationService($this->entityManager);
        $service->make($dataArray['id']);
        $response = new Response();
        $response->setStatusCode(Response::HTTP_OK);
        return $response;
    }

    /**
     * @Rest\Put("/api/useraway")
     * @param Request $request
     */
    public function updateUserAway(Request $request)
    {
        $content = $request->getContent();
        $dataArray = json_decode($content, true);
        $id = null;
        foreach ($dataArray['away_date'] as $value) {
            $userAway = $this->entityManager->getRepository(UserAway::class)->checkId($value['id']);
            if (!$userAway) {
            } else {
                $parkId = $userAway->getAwayUser()->getPermanentSpace()->getId();
                $clientId = $userAway->getAwayUser()->getId();
                $format = '!Y-m-d';
                $dateStart = \DateTime::createFromFormat($format, $value['away_start_date']);
                $dateEnd = \DateTime::createFromFormat($format, $value['away_end_date']);
                $userAway->setAwayStartDate($dateStart);
                $userAway->setAwayEndDate($dateEnd);
                $this->entityManager->persist($userAway); //not needed
            }
        }
        $this->entityManager->flush();

        $service = new ReservationService($this->entityManager);
        $service->updateOrDeleteReservation($clientId, $parkId);
        $response = new Response();
        $response->setStatusCode(Response::HTTP_OK);
        return $response;
    }

    /**
     * @Rest\Delete("/api/useraway")
     * @param Request $request
     */
    public function deleteUserAway(Request $request)
    {
        $content = $request->getContent();
        $dataArray = json_decode($content, true);

        foreach ($dataArray['away_date'] as $value) {
            $userAway = $this->entityManager->getRepository(UserAway::class)->checkId($value['id']);
            if (!$userAway) {
            } else {
                $parkId = $userAway->getAwayUser()->getPermanentSpace()->getId();
                $clientId = $userAway->getAwayUser()->getId();
                $this->entityManager->remove($userAway);
            }
        }
        $this->entityManager->flush();
        $service = new ReservationService($this->entityManager);
        $service->updateOrDeleteReservation($clientId, $parkId);
        $response = new Response();
        $response->setStatusCode(Response::HTTP_OK);
        return $response;  
    }


    private function serialize($data)
    {
        $serializer = SerializerBuilder::create()->build();
        $json = $serializer->serialize($data, 'json');
        return $json;
    }
}
