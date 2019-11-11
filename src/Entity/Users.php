<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\UsersRepository")
 */
class Users
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
     * @ORM\Column(type="string", length=255)
     */
    private $surname;

    /**
     * @ORM\Column(type="smallint")
     */
    private $status;

    /**
     * @ORM\Column(type="smallint")
     */
    private $awayStatus;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $email;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $licencePlate;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Roles")
     * @ORM\JoinColumn(nullable=false)
     */
    private $userRole;

    /**
     * @ORM\OneToOne(targetEntity="App\Entity\ParkSpaces", inversedBy="feedback", cascade={"persist", "remove"})
     * @ORM\JoinColumn(nullable=true)
     */
    private $userParkSpace;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\Reservations", mappedBy="userId")
     */
    private $reservations;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\UserAway", mappedBy="userId")
     */
    private $userAways;

    public function __construct()
    {
        $this->reservations = new ArrayCollection();
        $this->userAways = new ArrayCollection();
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
        return $this->userParkSpace;
    }

    public function setParkSpaceId(?ParkSpaces $parkSpaceId): self
    {
        $this->userParkSpace = $parkSpaceId;

        return $this;
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
            if ($reservation->getReservationUser() === $this) {
                $reservation->setReservationUser(null);
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


}
