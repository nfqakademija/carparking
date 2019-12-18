<?php
namespace App\DataFixtures;

use App\Entity\ParkSpaces;
use App\Entity\Roles;
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
        $this->makeFake($manager);
        $this->makeParkSpaces(20, $manager);
        $this->makeRoles($manager);
        $this->makeUsers(40, $manager);
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
                    $user->setRole('guest');
                    $manager->persist($user);
                    $this->addReference(self::ROLE_GUEST, $user);
                    break;
                case 2:
                    $user->setRole('user');
                    $manager->persist($user);
                    $this->addReference(self::ROLE_USER, $user);
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
                $user->setUserRole($this->getReference(self::ROLE_USER));
                $user->setPermanentSpace($this->getReference(self::PARK_SPACE . $i));
            } else {
                $user->setUserRole($this->getReference(self::ROLE_GUEST));
            }
            $this->addReference(self::USER . $i, $user);
            $manager->persist($user);
        }
        $manager->flush();
    }

    private function makeFake(ObjectManager $manager)
    {
        $guest = new Roles();
        $guest->setRole('guest');
        $manager->persist($guest);

        $user = new Roles();
        $user->setRole('user');
        $manager->persist($user);

        $parkSpace = new ParkSpaces();
        $parkSpace->setNumber('P021');
        $manager->persist($parkSpace);

        $userClient = new Users();
        $userClient->setName('Petras');
        $userClient->setSurname('Petraitis');
        $userClient->setUserRole($user);
        $userClient->setLicencePlate('UUU042');
        $userClient->setEmail("carparkingvardenis@gmail.com");
        $userClient->setPermanentSpace($parkSpace);
        $manager->persist($userClient);

        $userGuest = new Users();
        $userGuest->setName('Jonas');
        $userGuest->setSurname('Jonaitis');
        $userGuest->setUserRole($guest);
        $userGuest->setLicencePlate('GGG001');
        $userGuest->setEmail("johndoeguest080@gmail.com");
        $manager->persist($userGuest);
        $manager->flush();
    }
}
