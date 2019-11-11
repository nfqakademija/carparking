<?php

namespace App\Repository;

use App\Entity\ParkSpaces;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Common\Persistence\ManagerRegistry;

/**
 * @method ParkSpaces|null find($id, $lockMode = null, $lockVersion = null)
 * @method ParkSpaces|null findOneBy(array $criteria, array $orderBy = null)
 * @method ParkSpaces[]    findAll()
 * @method ParkSpaces[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class ParkSpacesRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, ParkSpaces::class);
    }

    // /**
    //  * @return ParkSpaces[] Returns an array of ParkSpaces objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('p')
            ->andWhere('p.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('p.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?ParkSpaces
    {
        return $this->createQueryBuilder('p')
            ->andWhere('p.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
