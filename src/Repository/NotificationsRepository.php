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
            ->andWhere('n.requestDate = :date')
            ->andWhere('n.user = :user')
            ->andWhere('n.guest = :guest')
            ->setParameter('date', $data['requestDate'])
            ->setParameter('user', $data['userId'])
            ->setParameter('guest', $data['guestId'])
            ->getQuery()
            ->getOneOrNullResult();
    }

    public function findNotificationById($id)
    {
        return $this->createQueryBuilder('n')
            ->andWhere('n.id = :id')
            ->setParameter('id', $id)
            ->getQuery()
            ->getOneOrNullResult();
    }

    public function findNotificationByGuestId($guestId)
    {
        return $this->createQueryBuilder('n')
            ->andWhere('n.guest = :id')
            ->setParameter('id', $guestId)
            ->getQuery()
            ->execute();
    }
}
