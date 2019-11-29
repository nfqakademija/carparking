<?php

namespace App\Controller;

use App\Entity\Reservations;
use App\Entity\Roles;
use App\Entity\UserAway;
use App\Entity\Users;
use App\Repository\ReservationsRepository;
use Doctrine\ORM\EntityManagerInterface;
use FOS\RestBundle\Controller\Annotations as Rest;
use FOS\RestBundle\FOSRestBundle;
use FOS\RestBundle\View\View;
use JMS\Serializer\SerializationContext;
use JMS\Serializer\SerializerBuilder;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class UserAwayController extends FOSRestBundle
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
     * @Rest\Get("/api/useraway")
     */
    public function getUserAwayList()
    {
        $article = $this->entityManager->getRepository(UserAway::class)->findAll();

        $serializer = SerializerBuilder::create()->build();
        $entity = $serializer->serialize($article, 'json');
        $response = new Response($entity);
        $response->headers->set('Content-Type', 'application/json');

        return $response;

        // $userProduct = $entity($article, array('onlyId'));
//        return new View($entity, Response::HTTP_OK);
        // In case our GET was a success we need to return a 200 HTTP OK response with the request object
        // return View::create($article, Response::HTTP_OK);
    }
    /**
     * @Rest\Get("/api/useraway/{id}")
     */

    public function getSingleUserAway($id)
    {
        $article = $this->entityManager->getRepository(UserAway::class)->checkByUserId($id);

        $serializer = SerializerBuilder::create()->build();
        $entity = $serializer->serialize($article, 'json');
        $response = new Response($entity);
        $response->headers->set('Content-Type', 'application/json');

        return $response;

        // $userProduct = $entity($article, array('onlyId'));
//        return new View($entity, Response::HTTP_OK);
        // In case our GET was a success we need to return a 200 HTTP OK response with the request object
        // return View::create($article, Response::HTTP_OK);
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
                $format = 'Y-m-d';
                $dateStart = \DateTime::createFromFormat($format, $value['away_start_date']);
                $dateEnd = \DateTime::createFromFormat($format, $value['away_end_date']);
                $userAway->setAwayStartDate($dateStart);
                $userAway->setAwayEndDate($dateEnd);
                $userAway->setAwayUser($user);
                $this->entityManager->persist($userAway);
            }
            $this->entityManager->flush();
        }
    }

    /**
     * @Rest\Put("/api/useraway")
     * @param Request $request
     */
    public function updateUserAway(Request $request)
    {
        $content = $request->getContent();
        $dataArray = json_decode($content, true);

        foreach ($dataArray['away_date'] as $value) {
            $userAway = $this->entityManager->getRepository(UserAway::class)->checkId($value['id']);
            if (!$userAway) {
            } else {
                $format = 'Y-m-d';
                $dateStart = \DateTime::createFromFormat($format, $value['away_start_date']);
                $dateEnd = \DateTime::createFromFormat($format, $value['away_end_date']);
                $userAway->setAwayStartDate($dateStart);
                $userAway->setAwayEndDate($dateEnd);
                $this->entityManager->persist($userAway); //not needed
            }
        }
        $this->entityManager->flush();
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
                $this->entityManager->remove($userAway);
            }
        }
        $this->entityManager->flush();
    }

}
