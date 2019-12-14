<?php

namespace App\Repository;

use App\Entity\Notifications;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Common\Persistence\ManagerRegistry;

/**
 * @method Notifications|null find($id, $lockMode = null, $lockVersion = null)
 * @method Notifications|null findOneBy(array $criteria, array $orderBy = null)
 * @method Notifications[]    findAll()
 * @method Notifications[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class NotificationsRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Notifications::class);
    }

    public function checkDuplicateEntry($data)
    {
        return $this->createQueryBuilder('n')
            ->andWhere('n.requestStartDate = :startDate')
            ->andWhere('n.requestEndDate = :endDate')
            ->andWhere('n.user = :user')
            ->andWhere('n.guest = :guest')
            ->setParameter('startDate', $data['requestStartDate'])
            ->setParameter('endDate', $data['requestEndDate'])
            ->setParameter('user', $data['userId'])
            ->setParameter('guest', $data['guestId'])
            ->getQuery()
            ->getOneOrNullResult();
    }
}
