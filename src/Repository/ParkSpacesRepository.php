<?php

namespace App\Repository;

use App\Entity\ParkSpaces;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Common\Persistence\ManagerRegistry;
use Doctrine\ORM\NonUniqueResultException;
use Doctrine\ORM\NoResultException;

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

    /**
     * @return mixed
     * @throws NoResultException
     * @throws NonUniqueResultException
     */
    public function countParkSpaces()
    {
        return $this->createQueryBuilder('p')
            ->select('count(p.id)')
            ->getQuery()
            ->getSingleScalarResult();
    }
}
