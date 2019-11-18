<?php

namespace App\Repository;

use App\Entity\UserAway;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Common\Persistence\ManagerRegistry;

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

    // /**
    //  * @return UserAway[] Returns an array of UserAway objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('u')
            ->andWhere('u.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('u.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?UserAway
    {
        return $this->createQueryBuilder('u')
            ->andWhere('u.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
