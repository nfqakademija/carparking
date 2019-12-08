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
     * @ORM\Column(type="smallint", nullable=true)
     */
    private $status;

    /**
     * @ORM\Column(type="smallint", nullable=true)
     */
    private $awayStatus;

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
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $permanentParkSpace;

    /**
     * @ORM\OneToOne(targetEntity="App\Entity\ParkSpaces", cascade={"persist", "remove"})
     */
    private $permanentSpace;


    /**
     * @ORM\Column(type="datetime", nullable=true)
     */
    private $created_at;

    public function __construct()
    {
        $this->reservations = new ArrayCollection();
        $this->userAways = new ArrayCollection();
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

    public function getStatus(): ?int
    {
        return $this->status;
    }

    public function setStatus(int $status): self
    {
        $this->status = $status;

        return $this;
    }

    public function getAwayStatus(): ?int
    {
        return $this->awayStatus;
    }

    public function setAwayStatus(int $awayStatus): self
    {
        $this->awayStatus = $awayStatus;

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

    public function getPermanentParkSpace(): ?string
    {
        return $this->permanentParkSpace;
    }

    public function setPermanentParkSpace(string $permanentParkSpace): self
    {
        $this->permanentParkSpace = $permanentParkSpace;

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
        return array('ROLE_' . strtoupper($role));
    }

    /**
     * Returns the password used to authenticate the user.
     *
     * This should be the encoded password. On authentication, a plain-text
     * password will be salted, encoded, and then compared to this value.
     *
     * @return string The password
     */
    public function getPassword()
    {
        return null;
    }

    /**
     * Returns the salt that was originally used to encode the password.
     *
     * This can return null if the password was not encoded using a salt.
     *
     * @return string|null The salt
     */
    public function getSalt()
    {
        return null;
    }

    /**
     * Returns the username used to authenticate the user.
     *
     * @return string The username
     */
    public function getUsername()
    {
        return $this->email;
    }

    /**
     * Removes sensitive data from the user.
     *
     * This is important if, at any given point, sensitive information like
     * the plain-text password is stored on this object.
     */
    public function eraseCredentials()
    {
        return null;
    }
}
