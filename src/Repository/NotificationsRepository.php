<?php

namespace App\Repository;

use App\Entity\Notifications;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Common\Persistence\ManagerRegistry;
use Doctrine\ORM\NonUniqueResultException;

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

    /**
     * @param $data
     * @return mixed
     * @throws NonUniqueResultException
     */
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

    /**
     * @param $id
     * @return mixed
     * @throws NonUniqueResultException
     */
    public function findNotificationById($id)
    {
        return $this->createQueryBuilder('n')
            ->andWhere('n.id = :id')
            ->setParameter('id', $id)
            ->getQuery()
            ->getOneOrNullResult();
    }

    /**
     * @param $userId
     * @param $role
     * @return mixed
     */
    public function findNotificationByUserId($userId, $role)
    {
        $qb = $this->createQueryBuilder('n');
        if ($role == 'guest') {
            $qb->andWhere('n.guest = :id');
        } else {
            $qb->andWhere('n.user = :id');
        }
        $qb->setParameter('id', $userId);

        return $qb->getQuery()->execute();
    }
}
