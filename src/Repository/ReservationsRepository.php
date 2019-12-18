<?php

namespace App\Repository;

use App\Entity\Reservations;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Common\Persistence\ManagerRegistry;
use Doctrine\ORM\NonUniqueResultException;

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

    public function getReservationsByArray($dateArray)
    {
        return $this->createQueryBuilder('r')
            ->andWhere('r.reservationDate IN (:dates)')
            ->setParameter('dates', $dateArray)
            ->getQuery()
            ->execute();
    }

    public function getReservationsByDate($date)
    {
        return $this->createQueryBuilder('r')
            ->andWhere('r.reservationDate = :dates')
            ->setParameter('dates', $date)
            ->getQuery()
            ->execute();
    }

    /**
     * @param $id
     * @return mixed
     * @throws NonUniqueResultException
     */
    public function findReservationById($id)
    {
        return $this->createQueryBuilder('r')
            ->andWhere('r.id = :id')
            ->setParameter('id', $id)
            ->getQuery()
            ->getOneOrNullResult();
    }

    /**
     * @param $date
     * @return mixed
     * @throws NonUniqueResultException
     */
    public function findReservationWithoutParkSpaceByDate($date)
    {
        return $this->createQueryBuilder('r')
            ->andWhere('r.reservationDate = :reservationDate')
            ->andWhere('r.parkSpace is NULL')
            ->setParameter('reservationDate', $date)
            ->setMaxResults(1)
            ->getQuery()
            ->getOneOrNullResult();
    }

    /**
     * @param $date
     * @param $clientId
     * @return mixed
     * @throws NonUniqueResultException
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

    /**
     * @param $date
     * @param $parkSpaceId
     * @return mixed
     * @throws NonUniqueResultException
     */
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

    /**
     * @param $date
     * @return mixed
     * @throws NonUniqueResultException
     * @throws \Doctrine\ORM\NoResultException
     */
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
