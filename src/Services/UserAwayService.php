<?php

namespace App\Services;

use App\Entity\UserAway;
use App\Entity\Users;
use Doctrine\ORM\EntityManagerInterface;
use JMS\Serializer\SerializerBuilder;

class UserAwayService
{
    private $entityManager;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    public function post($dataArray)
    {
        $user = $this->entityManager->getRepository(Users::class)->findUserById($dataArray['id']);

        if (!$user) {
        } else {
            foreach ($dataArray['away_date'] as $value) {
                $userAway = new UserAway();
                $dateStart = $this->dateFromString($value['away_start_date']);
                $dateEnd = $this->dateFromString($value['away_end_date']);
                $duplicate = $this->checkUserAwayDuplicates(
                    $dateStart->format('Y-m-d H:i:s'),
                    $dateEnd->format('Y-m-d H:i:s'),
                    $dataArray['id']
                );
                if ($duplicate) {
                    return $array = ['error' => "duplicate"];
                } else {
                    $userAway->setAwayStartDate($dateStart);
                    $userAway->setAwayEndDate($dateEnd);
                    $userAway->setAwayUser($user);
                    $this->entityManager->persist($userAway);
                }
            }
            $this->entityManager->flush();
            return $array = ['success' => "success"];
        }
    }

    public function put()
    {

    }

    private function checkUserAwayDuplicates($startDate, $endDate, $userId)
    {

        $userAway = $this->entityManager
            ->getRepository(UserAway::class)
            ->findSingleUserAwayByDate($startDate, $endDate, $userId);

        if ($userAway != null) {
            return true;
        }
        return false;
    }

    private function dateFromString($dateString)
    {
        $format = '!Y-m-d';
        $date = \DateTime::createFromFormat($format, $dateString);
        return $date;
    }


}
