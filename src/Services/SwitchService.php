<?php


namespace App\Services;

use Doctrine\ORM\EntityManagerInterface;

class SwitchService
{
    private $entityManager;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }


}