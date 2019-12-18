<?php

namespace App\Repository;

use App\Entity\UserAway;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Common\Persistence\ManagerRegistry;
use Doctrine\ORM\NonUniqueResultException;
use Doctrine\ORM\Query;

/**
 * @method UserAway|null find($id, $lockMode = null, $lockVersion = null)
 * @method UserAway|null findOneBy(array $criteria, array $orderBy = null)
 * @method UserAway[]    findAll()
 * @method UserAway[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class UserAwayRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, UserAway::class);
    }

    /**
     * @param $id
     * @return mixed
     * @throws NonUniqueResultException
     */
    public function findById($id)
    {
        return $this->createQueryBuilder('ua')
            ->andWhere('ua.id = :id')
            ->setParameter('id', $id)
            ->getQuery()
            ->getOneOrNullResult();
    }

    public function findByUserIdAnDate($id, $date)
    {

        return $this->createQueryBuilder('ua')
            ->andWhere('ua.awayUser = :id')
            ->andWhere('ua.awayStartDate = :date')
            ->andWhere('ua.awayEndDate = :date')
            ->setParameter('date', $date)
            ->setParameter('id', $id)
            ->getQuery()
            ->getOneOrNullResult();
    }

    /**
     * @param $id
     * @return mixed
     * @throws NonUniqueResultException
     */
    public function getByUserId($id)
    {
        return $this->createQueryBuilder('ua')
            ->andWhere('ua.awayUser = :id')
            ->setParameter('id', $id)
            ->getQuery()
            ->execute();
    }

    /**
     * @param $id
     * @return mixed
     */
    public function getUserAwayByUserId($id)
    {
        return $this->createQueryBuilder('ua')
            ->andWhere('ua.awayUser = :id')
            ->setParameter('id', $id)
            ->getQuery()
            ->getResult(Query::HYDRATE_ARRAY);
    }

    /**
     * @param $date
     * @return mixed
     * @throws NonUniqueResultException
     */
    public function findUserAwayByDate($date)
    {
        return $this->createQueryBuilder('ua')
            ->andWhere('ua.awayStartDate <= :date')
            ->andWhere('ua.awayEndDate >= :date')
            ->setParameter('date', $date)
            ->getQuery()
            ->execute();
    }


    public function findSingleUserAwayByDate($startDate, $endDate, $userId)
    {
        return $this->createQueryBuilder('ua')
            ->select('partial ua.{id, awayStartDate, awayEndDate}')
            ->leftJoin('ua.awayUser', 'u')
            ->orWhere('ua.awayUser = :id and ua.awayStartDate >= :startDate and ua.awayEndDate <= :endDate')
            ->orWhere(
                'ua.awayUser = :id 
                and ua.awayStartDate >= :startDate 
                and ua.awayEndDate >= :endDate 
                and ua.awayStartDate <= :endDate'
            )
            ->orWhere(
                'ua.awayUser = :id 
                and ua.awayStartDate <= :startDate 
                and ua.awayEndDate >= :startDate
                and ua.awayEndDate <= :endDate'
            )
            ->orWhere(
                'ua.awayUser = :id 
                and ua.awayStartDate <= :startDate 
                and ua.awayEndDate >= :endDate'
            )
            ->setParameter('startDate', $startDate)
            ->setParameter('endDate', $endDate)
            ->setParameter('id', $userId)
            ->getQuery()
            ->getResult(Query::HYDRATE_ARRAY);
    }
}
