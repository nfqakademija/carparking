<?php

namespace App\Repository;

use App\Entity\Users;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Common\Persistence\ManagerRegistry;
use Doctrine\ORM\NonUniqueResultException;
use Doctrine\ORM\Query;
use Doctrine\ORM\Query\Expr\Join;

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
     * @param $id
     * @return mixed
     * @throws NonUniqueResultException
     */
    public function findUserByRoleGuestAndId($id)
    {
        $guest = 'guest';

        return $this->createQueryBuilder('u')
            ->leftJoin('u.userRole', 'r')
            ->andWhere('u.id = :id')
            ->andWhere('r.role = :guest')
            ->setParameter('guest', $guest)
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

    public function countUsersByAwayDate($date)
    {
        return $this->createQueryBuilder('u')
            ->select('count(u.id)')
            ->leftJoin('u.userAways', 'ua')
            ->andWhere('ua.awayStartDate <= :date')
            ->andWhere('ua.awayEndDate >= :date')
            ->setParameter('date', $date)
            ->getQuery()
            ->getSingleScalarResult();
    }

    public function getUsersList()
    {
        return $this->createQueryBuilder('u')
            ->select(
                'partial u.{id, name, surname},
                partial ua.{id, awayStartDate, awayEndDate},
                partial ro.{id, role}, 
                partial re.{id, reservationDate},
                partial p.{id,number}'
            )
            ->leftJoin('u.userRole', 'ro')
            ->leftJoin('u.userAways', 'ua')
            ->leftJoin('u.reservations', 're')
            ->leftJoin('re.parkSpace', 'p')
            ->getQuery()
            ->getArrayResult();
    }

    public function getSingleUserList($userId)
    {
        {

            return $this->createQueryBuilder('u')
                ->select(
                    'partial u.{id, name, surname, licencePlate},
                    partial ro.{id, role}, 
                    partial p.{id, number}, 
                    partial ua.{id, awayStartDate, awayEndDate},
                    partial re.{id, reservationDate},
                    partial s.{id, number}'
                )
                ->andWhere('u.id = :id')
                ->setParameter('id', $userId)
                ->leftJoin('u.userRole', 'ro')
                ->leftJoin('u.permanentSpace', 'p')
                ->leftJoin('u.userAways', 'ua')
                ->leftJoin('u.reservations', 're')
                ->leftJoin('re.parkSpace', 's')
                ->getQuery()
                ->getArrayResult();
        }
    }
}
