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
     * @Rest\Post("/api/reservations")
     */
    public function index(Request $request)
    {
        $content = $request->headers->get('Newuser');
        var_dump($content);
//        $dataArray = json_decode($content, true);

        die;
//
//        $data = $this->entityManager->getRepository(Reservations::class)->findAll();
//        $json = $this->serialize($data);
//        $response = new Response($json);
//        $response->headers->set('Content-Type', 'application/json');
//        $response->getStatusCode();
//        return $response;
    }

    /**
     * @Rest\Get("/api/make-reservation")
     * @throws \Exception
     */
    public function make()
    {
        $service = new ReservationService($this->entityManager);
        $service->make();
        $response = new Response();
        $response->setStatusCode(Response::HTTP_OK);
        return $response;
    }

    /**
     * @Rest\Get("/api/reserve")
     * @throws \Exception
     */
    public function guest()
    {
//        $service = new ReservationService($this->entityManager);
//        $service->guestReservation();
//        die;
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
