<?php

namespace App\Repository;

use App\Entity\UserAway;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Common\Persistence\ManagerRegistry;
use Doctrine\ORM\NonUniqueResultException;

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
    public function getUserAwayById($id)
    {
        return $this->createQueryBuilder('u')
            ->andWhere('u.id = :id')
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
        return $this->createQueryBuilder('u')
            ->andWhere('u.awayUser = :id')
            ->setParameter('id', $id)
            ->getQuery()
            ->getOneOrNullResult();
    }

    /**
     * @param $id
     * @return mixed
     */
    public function getUserAwayByUserId($id)
    {
        return $this->createQueryBuilder('u')
            ->andWhere('u.awayUser = :id')
            ->setParameter('id', $id)
            ->getQuery()
            ->getResult(\Doctrine\ORM\Query::HYDRATE_ARRAY);
    }
}
