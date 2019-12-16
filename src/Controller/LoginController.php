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

//https://accounts.google.com/o/oauth2/v2/
//auth?scope=openid
//%20email
//%20profile&state=7ce1fd224fe5dd87fbc36399098e17cb&response_type=code
//&approval_prompt=auto&redirect_uri=http%3A%2F%2F127.0.0.1
//%3A8000%2Fconnect%2Fgoogle%2Fcheck&client_id=45766845940-jmhn5bffb9e9l1coqecms4p7ug237led.apps.googleusercontent.com


}
