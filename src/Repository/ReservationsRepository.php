<?php

namespace App\Repository;

use App\Entity\Reservations;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Common\Persistence\ManagerRegistry;

/**
 * @method Reservations|null find($id, $lockMode = null, $lockVersion = null)
 * @method Reservations|null findOneBy(array $criteria, array $orderBy = null)
 * @method Reservations[]    findAll()
 * @method Reservations[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class ReservationsRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Reservations::class);
    }

    public function getReservationsByArrayAndId(array $dateArray, string $id)
    {
        return $this->createQueryBuilder('r')
            ->andWhere('r.user = :id')
            ->andWhere('r.reservationDate IN (:dates)')
            ->setParameter('id', $id)
            ->setParameter('dates', $dateArray)
            ->getQuery()
            ->execute();
    }

    public function getReservationsWithoutUserId()
    {
        $value = null;
        return $this->createQueryBuilder('r')
            ->andWhere('r.user = :id')
            ->setParameter('id', ' ')
            ->getQuery()
            ->execute();
    }

    public function getReservationByParkIdAndByUserId($clientId, $parkId)
    {
        return $this->createQueryBuilder('r')
            ->andWhere('r.parkSpace = :parkId')
            ->andWhere('r.user = :id')
            ->setParameter('id', $clientId)
            ->setParameter('parkId', $parkId)
            ->getQuery()
            ->execute();
    }

    /**
     * @param $date
     * @param $clientId
     * @return mixed
     * @throws \Doctrine\ORM\NonUniqueResultException
     */
    public function findReservationByDateAndUserId($date, $clientId)
    {
        return $this->createQueryBuilder('r')
            ->andWhere('r.reservationDate = :reservationDate')
            ->andWhere('r.user = :id')
            ->setParameter('id', $clientId)
            ->setParameter('reservationDate', $date)
            ->getQuery()
            ->getOneOrNullResult();
    }

    public function findReservationByDateAndParkSpaceId($date, $parkSpaceId)
    {
        return $this->createQueryBuilder('r')
            ->andWhere('r.reservationDate = :reservationDate')
            ->andWhere('r.parkSpace = :id')
            ->setParameter('id', $parkSpaceId)
            ->setParameter('reservationDate', $date)
            ->getQuery()
            ->getOneOrNullResult();
    }

    public function countReservationByDateAndWithParkSpaceId($date)
    {
        return $this->createQueryBuilder('r')
            ->select('count(r.id)')
            ->andWhere('r.reservationDate = :reservationDate')
            ->andWhere('r.parkSpace > 0')
            ->setParameter('reservationDate', $date)
            ->getQuery()
            ->getSingleScalarResult();
    }
}
