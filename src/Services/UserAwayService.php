<?php

namespace App\Services;

use App\Entity\UserAway;
use App\Entity\Users;
use Doctrine\ORM\EntityManagerInterface;

class UserAwayService
{
    private $entityManager;
    private $reservationService;

    public function __construct(EntityManagerInterface $entityManager, ReservationService $reservationService)
    {
        $this->entityManager = $entityManager;
        $this->reservationService = $reservationService;
    }

    public function getSingle($userId)
    {
        $userAways = $this->entityManager->getRepository(UserAway::class)->getByUserId($userId);

        $dataArray = [];
        foreach ($userAways as $userAway) {
            $single = [];
            $single['awayId'] = $userAway->getId();
            $single['startDate'] = $userAway->getAwayStartDate()->format('Y-m-d');
            $single['endDate'] = $userAway->getAwayEndDate()->format('Y-m-d');
            array_push($dataArray, $single);
        }
        return $dataArray;
    }

    public function post($dataArray)
    {
        $user = $this->entityManager->getRepository(Users::class)->findUserById($dataArray['id']);

        if ($user->getUserRole()->getRole() !== 'user') {
            return ['error' => "not guest"];
        } else {
            $dateArray = [];
            foreach ($dataArray['awayDate'] as $value) {
                $userAway = new UserAway();
                $dateStart = $this->dateFromString($value['awayStartDate']);
                $dateEnd = $this->dateFromString($value['awayEndDate']);

                $validate = $this->validateProvidedDate($dateStart, $dateEnd);
                if ($validate) {
                    return ['error' => 'date sequence not valid'];
                } else {
                    $duplicate = $this->checkUserAwayDuplicates(
                        $dateStart->format('Y-m-d H:i:s'),
                        $dateEnd->format('Y-m-d H:i:s'),
                        $dataArray['id']
                    );
                    if ($duplicate) {
                        return ['error' => "duplicate"];
                    } else {
                        $userAway->setAwayStartDate($dateStart);
                        $userAway->setAwayEndDate($dateEnd);
                        $userAway->setAwayUser($user);
                        $this->entityManager->persist($userAway);
                        $data = $this->dateTimeIntervalTransformer($dateStart, $dateEnd);
                        $dateArray = array_merge($data, $dateArray);
                    }
                }
            }
            $this->reservationService
                ->changeReservationsByProvidedArray($dateArray, $user->getPermanentSpace(), 'add');

            $this->entityManager->flush();
            return ['success' => "created"];
        }
    }

    public function put($dataArray)
    {
        foreach ($dataArray['awayDate'] as $value) {
            $userAway = $this->entityManager->getRepository(UserAway::class)->findById($value['id']);
            if (!$userAway) {
                return ['error' => 'no data for id'];
            } else {
                $dateStart = $this->dateFromString($value['awayStartDate']);
                $dateEnd = $this->dateFromString($value['awayEndDate']);
                $validate = $this->validateProvidedDate($dateStart, $dateEnd);
                if ($validate) {
                    return ['error' => 'date sequence not valid'];
                } else {
                    $oldDateIntervalArray = $this->dateTimeIntervalTransformer(
                        $userAway->getAwayStartDate(),
                        $userAway->getAwayEndDate()
                    );
                    $newDateIntervalArray = $this->dateTimeIntervalTransformer($dateStart, $dateEnd);

                    $this->reservationService
                        ->changeReservationsByProvidedArray(
                            $oldDateIntervalArray,
                            $userAway
                                ->getAwayUser()
                                ->getPermanentSpace(),
                            'delete'
                        );

                    $this->reservationService
                        ->changeReservationsByProvidedArray(
                            $newDateIntervalArray,
                            $userAway
                                ->getAwayUser()
                                ->getPermanentSpace(),
                            'add'
                        );

                    $userAway->setAwayStartDate($dateStart);
                    $userAway->setAwayEndDate($dateEnd);
                }
            }
        }
        $this->entityManager->flush();
        return ['success' => "created"];
    }

    public function delete($dataArray)
    {
        $dateArray = [];
        foreach ($dataArray['awayDate'] as $value) {
            $userAway = $this->entityManager->getRepository(UserAway::class)->findById($value['id']);
            if (!$userAway) {
                return ['error' => 'nothing found'];
            } else {
                $data = $this->dateTimeIntervalTransformer($userAway->getAwayStartDate(), $userAway->getAwayEndDate());
                $dateArray = array_merge($data, $dateArray);
                $this->entityManager->remove($userAway);
            }
        }

        $this->reservationService
            ->changeReservationsByProvidedArray($dateArray, $userAway->getAwayUser()->getPermanentSpace(), 'delete');
        $this->checkUserAwaysForReservations($dateArray);
        $this->entityManager->flush();
        return ['success' => "created"];
    }

    public function checkUserAwayDuplicates($startDate, $endDate, $userId)
    {

        $userAway = $this->entityManager
            ->getRepository(UserAway::class)
            ->findSingleUserAwayByDate($startDate, $endDate, $userId);
        if ($userAway != null) {
            return true;
        }
        return false;
    }

    public function checkUserAwaysForReservations($dateArray)
    {
        foreach ($dateArray as $date) {
            $userAway = $this->entityManager->getRepository(UserAway::class)->findUserAwayByDate($date);
            if ($userAway !== null) {
                foreach ($userAway as $user) {
                    $parkSpaceId = $user->getAwayUser()->getPermanentSpace()->getId();
                    $available = $this->reservationService->checkSpacesAtGivenDay($date, $parkSpaceId);

                    if ($available == null) {
                        $parkSpace = $user->getAwayUser()->getPermanentSpace();
                        $this->reservationService->changeReservationsByDate($date, $parkSpace);
                    }
                }
            }
        }
    }

    private function validateProvidedDate($startDate, $endDate)
    {
        if ($startDate > $endDate) {
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

    private function dateTimeIntervalTransformer(\DateTime $awayStart, \DateTime $awayEnd)
    {
        $array = [];
        $endObject = new \DateTime($awayEnd->format('Y-m-d'));
        $endObject->modify("+1 day");
        $period = new \DatePeriod(
            new \DateTime($awayStart->format('Y-m-d')),
            new \DateInterval('P1D'),
            $endObject
        );
        foreach ($period as $string) {
            array_push($array, $string->format('Y-m-d'));
        }
        return $array;
    }
}
