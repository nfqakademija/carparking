<?php

namespace App\Controller;

use PHP_CodeSniffer\Reports\Json;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use FOS\RestBundle\Controller\Annotations as Rest;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;

class LoginController extends AbstractController
{
    /**
     * @Route("/", name="login")
     */
    public function index()
    {
        return $this->render('login/index.html.twig', [
            'controller_name' => 'LoginController',
        ]);
    }

    /**
     * @Route("/logout", name="logout")
     */
    public function logout()
    {
//        var_dump($request->cookies);
//        die;
//        foreach ($_COOKIE as $cookieName => $cookieData) {
//            $response->headers->clearCookie($cookieName, $cookieData['path'], $cookieData['domain']);
//        }
    }
}
