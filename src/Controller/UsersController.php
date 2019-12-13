<?php

namespace App\Controller;

use App\Services\UsersService;
use Doctrine\ORM\EntityManagerInterface;
use FOS\RestBundle\FOSRestBundle;
use FOS\RestBundle\Controller\Annotations as Rest;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;

class UsersController extends FOSRestBundle
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
     * @Rest\Get("/api/users")
     */
    public function getUsersList()
    {
        $service = new UsersService($this->entityManager);
        $list = $service->userList();
        return new JsonResponse($list);
    }

    /**
     * @Rest\Get("/api/single-user/{id}")
     */
    public function getOneUser($id)
    {
        //TODO implement user id addition in guard
        $service = new UsersService($this->entityManager);
        $list = $service->singleUserList($id);
        return new JsonResponse($list);
    }

    /**
     * @Rest\Post("/api/licenseplate")
     * @return JsonResponse
     */
    public function postLicensePlate(Request $request)
    {
        $content = $request->getContent();
        $dataArray = json_decode($content, true);
        $service = new UsersService($this->entityManager);
        $list = $service->createLicensePlate($dataArray);
        return new JsonResponse($list);
    }

    /**
     * @Rest\Delete("/api/licenseplate")
     * @return JsonResponse
     */
    public function deleteLicensePlate(Request $request)
    {
        $content = $request->getContent();
        $dataArray = json_decode($content, true);
        $service = new UsersService($this->entityManager);
        $list = $service->deleteLicensePlate($dataArray);
        return new JsonResponse($list);
    }
}
