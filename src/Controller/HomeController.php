<?php
namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class HomeController extends AbstractController
{
    /**
     * @Route("/app/{reactRouting}", name="index", defaults={"reactRouting": null})
     */
    public function dashboard(): Response
    {
        return $this->render('home/index.html.twig');
    }
}
