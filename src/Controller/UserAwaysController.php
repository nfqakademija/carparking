<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

class UserAwaysController extends AbstractController
{
    /**
     * @Route("/user/aways", name="user_aways")
     */
    public function index()
    {
        return $this->render('user_aways/index.html.twig', [
            'controller_name' => 'UserAwaysController',
        ]);
    }
}
