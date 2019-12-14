<?php

namespace App\Controller;

use App\Entity\Reservations;
use App\Security\TokenAuthenticator;
use App\Services\ReservationService;
use Doctrine\ORM\EntityManagerInterface;
use FOS\RestBundle\FOSRestBundle;
use JMS\Serializer\SerializerBuilder;
use Lexik\Bundle\JWTAuthenticationBundle\Encoder\JWTEncoderInterface;
use Lexik\Bundle\JWTAuthenticationBundle\Encoder\LcobucciJWTEncoder;
use Lexik\Bundle\JWTAuthenticationBundle\Security\Guard\JWTTokenAuthenticator;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use FOS\RestBundle\Controller\Annotations as Rest;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;

class ReservationController extends FOSRestBundle
{
    private $entityManager;

    /**
     * @param TokenAuthenticator $tokenAuthenticator
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
        $service = new ReservationService($this->entityManager);
        $service->reservationList();
        return new JsonResponse($service->reservationList());
    }


    /**
     * @Rest\Post("/api/reservations")
     */
    public function createReservation(Request $request)
    {
        $content = $request->getContent();
        $dataArray = json_decode($content, true);
        $service = new ReservationService($this->entityManager);
        $response = $service->makeGuestReservation($dataArray);
        return new JsonResponse($response);
    }

    /**
     * @param $data
     * @return string
     */
    private function serialize($data)
    {
        $serializer = SerializerBuilder::create()->build();
        $json = $serializer->serialize($data, 'json');
        return $json;
    }
}
