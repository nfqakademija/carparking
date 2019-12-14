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
    private const PARK_SPACE = 'parkspace';
    private const ROLE_ADMIN = 'role_admin';
    private const ROLE_USER = 'role_user';
    private const ROLE_GUEST = 'role_guest';
    private const USER = 'name';
    private $faker;

    /**
     * @var \Faker\Factory
     */
    public function __construct()
    {
        $this->faker = \Faker\Factory::create();
    }

    public function load(ObjectManager $manager)
    {
        $this->makeParkSpaces(20, $manager);
        $this->makeRoles($manager);
        $this->makeUsers(40, $manager);
        //$this->makeUserAwayPeriods(5, $manager);
       // $this->makeReservations(20, 5, $manager);
    }

    private function makeParkSpaces($number, ObjectManager $manager)
    {
        for ($i = 1; $i <= $number; $i++) {
            $product = new ParkSpaces();
            if ($i < 10) {
                $stringNumber = "P00" . $i;
            } else {
                $stringNumber = "P0" . $i;
            }
            $product->setNumber($stringNumber);
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
            $name = $this->faker->firstName;
            $user->setName($name);
            $surname = $this->faker->lastName;
            $user->setSurname($surname);

            if ($i < 10) {
                $stringNumber = "ABC00" . $i;
            } else {
                $stringNumber = "ABC0" . $i;
            }
            $user->setLicencePlate($stringNumber);
            $user->setEmail($name . $surname . "@mail.com");
            if ($i <= 20) {
                if ($i == 1) {
                    $user->setUserRole($this->getReference(self::ROLE_ADMIN));
                } else {
                    $user->setUserRole($this->getReference(self::ROLE_USER));
                }
                $user->setPermanentSpace($this->getReference(self::PARK_SPACE . $i));
            } elseif ($i <= 30) {
                $user->setUserRole($this->getReference(self::ROLE_GUEST));
            } else {
                $user->setUserRole($this->getReference(self::ROLE_GUEST));
            }
            $this->addReference(self::USER . $i, $user);
            $manager->persist($user);
        }
        $manager->flush();
    }

    private function makeReservations($number, $daysPerUser, ObjectManager $manager)
    {
        for ($i = 1; $i <= $number; $i++) {
            for ($j = 0; $j < $daysPerUser; $j++) {
                $date = new \DateTime('now');
                $reservations = new Reservations();
                $reservations->setUser($this->getReference(self::USER . $i));
                $date->modify("+" . $j . " day");
                $reservations->setReservationDate($date);
                $manager->persist($reservations);
            }
        }
        $manager->flush();
    }

    private function makeUserAwayPeriods($number, ObjectManager $manager)
    {
        for ($i = 1; $i <= $number; $i++) {
            $reservations = new UserAway();
            $userNumber = rand(1, $number);
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
