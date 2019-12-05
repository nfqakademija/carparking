<?php

namespace App\Repository;

use App\Entity\Users;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Common\Persistence\ManagerRegistry;
use Doctrine\ORM\NonUniqueResultException;

/**
 * @method Users|null find($id, $lockMode = null, $lockVersion = null)
 * @method Users|null findOneBy(array $criteria, array $orderBy = null)
 * @method Users[]    findAll()
 * @method Users[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class UsersRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Users::class);
    }

    /**
     * @param $id
     * @return mixed
     * @throws NonUniqueResultException
     */
    public function findUserById($id)
    {
        return $this->createQueryBuilder('u')
            ->andWhere('u.id = :id')
            ->setParameter('id', $id)
            ->getQuery()
            ->getOneOrNullResult();
    }

    /**
     * @return mixed

     */
    public function getUsersByRoles()
    {
        $admin = 'admin';
        $user = 'user';

        return $this->createQueryBuilder('u')
            ->andWhere('u.status = :val')
            ->leftJoin('u.userRole', 'r')
            ->andWhere('r.role = :admin OR r.role = :user')
            ->setParameter('admin', $admin)
            ->setParameter('user', $user)
            ->setParameter('val', 1)
            ->getQuery()
            ->execute();
    }

    public function getUsersByIdAndStatus($id)
    {
        return $this->createQueryBuilder('u')
            ->andWhere('u.status = :val')
            ->andWhere('u.id = :id')
            ->setParameter('id', $id)
            ->setParameter('val', 1)
            ->getQuery()
            ->execute();
    }
}
