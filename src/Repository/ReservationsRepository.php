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

    public function reservationsByArrayAndId(array $dateArray, string $id)
    {
        return $this->createQueryBuilder('r')
            ->andWhere('r.user = :id')
            ->andWhere('r.reservationDate IN (:dates)')
            ->setParameter('id', $id)
            ->setParameter('dates', $dateArray)
            ->getQuery()
            ->execute();
    }

    public function reservationsNotArrayAndId(array $dateArray, string $id)
    {
        return $this->createQueryBuilder('r')
            ->andWhere('r.user = :id')
            ->andWhere('r.reservationDate NOT IN (:dates)')
            ->setParameter('id', $id)
            ->setParameter('dates', $dateArray)
            ->getQuery()
            ->execute();
    }

    public function reservationByParkIdAndByUserId($clientId, $parkId)
    {
        return $this->createQueryBuilder('r')
            ->andWhere('r.parkSpace = :parkId')
            ->orWhere('r.user = :id')
            ->setParameter('id', $clientId)
            ->setParameter('parkId', $parkId)
            ->getQuery()
            ->execute();
    }


//    public function findUsers()
//    {
//        $admin = 'admin';
//        $user = 'user';
//
//        return $this->createQueryBuilder('u')
//            ->andWhere('u.status = :val')
//            ->leftJoin('u.userRole', 'r')
//            ->andWhere('r.role = :admin OR r.role = :user')
//            ->setParameter('admin', $admin)
//            ->setParameter('user', $user)
//            ->setParameter('val', 1)
//            ->getQuery()
//            ->execute();
//    }
}
