<?php

namespace App\DataFixtures;

use App\Entity\ParkSpaces;
use App\Entity\Reservations;
use App\Entity\Roles;
use App\Entity\UserAway;
use App\Entity\Users;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\Persistence\ObjectManager;

class AppFixtures extends Fixture
{
    public const PARK_SPACE = 'parkspace';
    public const ROLE_ADMIN = 'role_admin';
    public const ROLE_USER = 'role_user';
    public const ROLE_GUEST = 'role_guest';
    public const USER = 'name';

    public function load(ObjectManager $manager)
    {
        $this->makeParkSpaces(20, $manager);
        $this->makeRoles($manager);
        $this->makeUsers(30, $manager);
        $this->makeReservations(30, $manager);
        $this->makeUserAwayPeriods(6, $manager);
    }

    private function makeParkSpaces($number, ObjectManager $manager)
    {
        for ($i = 1; $i <= $number; $i++) {
            $product = new ParkSpaces();
            $product->setNumber($i);
            $product->setAvailable(0);
            $manager->persist($product);
            $this->addReference(self::PARK_SPACE . $i, $product);
        }
        $manager->flush();
    }

    private function makeRoles(ObjectManager $manager)
    {
        for ($i = 1; $i <= 3; $i++) {
            $user = new Roles();
            switch ($i) {
                case 1:
                    $user->setRole('admin');
                    $manager->persist($user);
                    $this->addReference(self::ROLE_ADMIN, $user);
                    break;
                case 2:
                    $user->setRole('user');
                    $manager->persist($user);
                    $this->addReference(self::ROLE_USER, $user);
                    break;
                case 3:
                    $user->setRole('guest');
                    $manager->persist($user);
                    $this->addReference(self::ROLE_GUEST, $user);
                    break;
            }
        }
        $manager->flush();
    }

    private function makeUsers($number, ObjectManager $manager)
    {
        for ($i = 1; $i <= $number; $i++) {
            $user = new Users();
            $user->setName("Name.$i");
            $user->setSurname("Surname.$i");
            $user->setStatus(1);
            $user->setAwayStatus(0);
            $user->setLicencePlate("AAA0$i");
            $user->setEmail("user.$i.@mail.com");
            if ($i <= 20) {
                if ($i == 1) {
                    $user->setUserRole($this->getReference(self::ROLE_ADMIN));
                } else {
                    $user->setUserRole($this->getReference(self::ROLE_USER));
                }
                $user->setParkSpaceId($this->getReference(self::PARK_SPACE . $i));
            } else {
                $user->setUserRole($this->getReference(self::ROLE_GUEST));
            }
            $this->addReference(self::USER . $i, $user);
            $manager->persist($user);
        }
        $manager->flush();
    }

    private function makeReservations($number, ObjectManager $manager)
    {
        $date = new \DateTime(date('Y-m-d H:i:s'));
        for ($i = 1; $i <= $number; $i++) {
            $reservations = new Reservations();
            $reservations->setReservationUser($this->getReference(self::USER . $i));
            $reservations->setReservationDate($date);
            $manager->persist($reservations);
        }
        $manager->flush();
    }

    private function makeUserAwayPeriods($number, ObjectManager $manager)
    {
        for ($i = 1; $i <= $number; $i++) {
            $reservations = new UserAway();
            $userNumber = rand(1, 20);
            $reservations->setAwayUser($this->getReference(self::USER . $userNumber));
            $reservations->setAwayStartDate($this->dateModifier(1, 4));
            $reservations->setAwayEndDate($this->dateModifier(5, 7));
            $manager->persist($reservations);
        }
        $manager->flush();
    }

    private function dateModifier($start, $end): \DateTime
    {
        $date = new \DateTime(date('Y-m-d H:i:s'));
        $rand = rand($start, $end);
        $date->modify("+" . $rand . " day");
        return $date;
    }
}