<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Security\Core\User\UserInterface;

/**
 * @ORM\Entity(repositoryClass="App\Repository\UsersRepository")
 */
class Users implements UserInterface
{

    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $name;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $surname;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $email;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $licencePlate;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Roles")
     * @ORM\JoinColumn()
     */
    private $userRole;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\Reservations", mappedBy="user")
     */
    private $reservations;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\UserAway", mappedBy="awayUser")
     * @ORM\JoinColumn()
     */
    private $userAways;

    /**
     * @ORM\OneToOne(targetEntity="App\Entity\ParkSpaces", cascade={"persist", "remove"})
     */
    private $permanentSpace;

    /**
     * @ORM\Column(type="datetime", nullable=true)
     */
    private $created_at;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\Notifications", mappedBy="user")
     */
    private $userNotifications;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\Notifications", mappedBy="guest")
     */
    private $guestNotifications;

    public function __construct()
    {
        $this->reservations = new ArrayCollection();
        $this->userAways = new ArrayCollection();
        $this->userNotifications = new ArrayCollection();
        $this->guestNotifications = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    public function getSurname(): ?string
    {
        return $this->surname;
    }

    public function setSurname(string $surname): self
    {
        $this->surname = $surname;

        return $this;
    }


    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): self
    {
        $this->email = $email;

        return $this;
    }

    public function getLicencePlate(): ?string
    {
        return $this->licencePlate;
    }

    public function setLicencePlate(?string $licencePlate): self
    {
        $this->licencePlate = $licencePlate;

        return $this;
    }

    public function getUserRole(): ?Roles
    {
        return $this->userRole;
    }

    public function setUserRole(?Roles $roleId): self
    {
        $this->userRole = $roleId;

        return $this;
    }

//TODO delete
    public function getUserParkSpace(): ?ParkSpaces
    {
        return $this->permanentSpace;
    }

    public function setUserParkSpace(?ParkSpaces $userParkSpace): self
    {
        $this->permanentSpace = $userParkSpace;

        return $this;
    }

    public function getCreatedAt(): ?\DateTimeInterface
    {
        return $this->created_at;
    }

    /**
     * @return Collection|Reservations[]
     */
    public function getReservations(): Collection
    {
        return $this->reservations;
    }

    public function addReservation(Reservations $reservation): self
    {
        if (!$this->reservations->contains($reservation)) {
            $this->reservations[] = $reservation;
            $reservation->setReservationUser($this);
        }

        return $this;
    }

    public function removeReservation(Reservations $reservation): self
    {
        if ($this->reservations->contains($reservation)) {
            $this->reservations->removeElement($reservation);
            // set the owning side to null (unless already changed)
            if ($reservation->getUser() === $this) {
                $reservation->setUser(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection|UserAway[]
     */
    public function getUserAways(): Collection
    {

        return $this->userAways;
    }


    public function addUserAway(UserAway $userAway): self
    {
        if (!$this->userAways->contains($userAway)) {
            $this->userAways[] = $userAway;
            $userAway->setAwayUser($this);
        }

        return $this;
    }

    public function removeUserAway(UserAway $userAway): self
    {
        if ($this->userAways->contains($userAway)) {
            $this->userAways->removeElement($userAway);
            // set the owning side to null (unless already changed)
            if ($userAway->getAwayUser() === $this) {
                $userAway->setAwayUser(null);
            }
        }

        return $this;
    }

    public function getPermanentSpace(): ?ParkSpaces
    {
        return $this->permanentSpace;
    }

    public function setPermanentSpace(?ParkSpaces $permanentSpace): self
    {
        $this->permanentSpace = $permanentSpace;

        return $this;
    }

    /**
     * Returns the roles granted to the user.
     *
     * <code>
     * public function getRoles()
     * {
     *     return array('ROLE_USER');
     * }
     * </code>
     *
     * Alternatively, the roles might be stored on a ``roles`` property,
     * and populated in any number of different ways when the user object
     * is created.
     *
     * @return (Role|string)[] The user roles
     */
    public function getRoles()
    {
        $role = $this->getUserRole()->getRole();
        if ($role === 'guest') {
            $role = 'user';
        } else {
            $role = $this->getUserRole()->getRole();
        }
        return array('ROLE_' . strtoupper($role));
    }

    /**
     * @return string The password
     */
    public function getPassword()
    {
        return null;
    }

    /**
     * @return string|null The salt
     */
    public function getSalt()
    {
        return null;
    }

    /**
     *
     * @return string The username
     */
    public function getUsername()
    {
        return $this->email;
    }

    public function eraseCredentials()
    {
        return null;
    }

    /**
     * @return Collection|Notifications[]
     */
    public function getUserNotifications(): Collection
    {
        return $this->userNotifications;
    }

    public function addUserNotification(Notifications $userNotification): self
    {
        if (!$this->userNotifications->contains($userNotification)) {
            $this->userNotifications[] = $userNotification;
            $userNotification->setUser($this);
        }
        return $this;
    }

    public function addNotification(Notifications $userNotification): self
    {
        if ($this->userNotifications->contains($userNotification)) {
            $this->userNotifications->removeElement($userNotification);
            // set the owning side to null (unless already changed)
            if ($userNotification->getUser() === $this) {
                $userNotification->setUser(null);
            }
        }
        return $this;
    }

    /**
     * @return Collection|Notifications[]
     */
    public function getGuestNotifications(): Collection
    {
        return $this->guestNotifications;
    }

    public function addGuestNotification(Notifications $guestNotification): self
    {
        if (!$this->guestNotifications->contains($guestNotification)) {
            $this->guestNotifications[] = $guestNotification;
            $guestNotification->setGuest($this);
        }

        return $this;
    }

    public function removeGuestNotification(Notifications $guestNotification): self
    {
        if ($this->guestNotifications->contains($guestNotification)) {
            $this->guestNotifications->removeElement($guestNotification);
            // set the owning side to null (unless already changed)
            if ($guestNotification->getGuest() === $this) {
                $guestNotification->setGuest(null);
            }
        }

        return $this;
    }
}
