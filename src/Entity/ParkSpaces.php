<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\ParkSpacesRepository")
 */
class ParkSpaces
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
    private $number;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\Reservations", mappedBy="parkSpace")
     * @ORM\JoinColumn()
     */
    private $reservation;

    public function __construct()
    {
        $this->reservation = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getNumber(): ?string
    {
        return $this->number;
    }

    public function setNumber(string $number): self
    {
        $this->number = $number;

        return $this;
    }

    public function getReservation(): ?Reservations
    {
        return $this->reservation;
    }

    public function setReservation(?Reservations $reservation): self
    {
        $this->reservation = $reservation;
        return $this;
    }

    public function addReservation(Reservations $reservation): self
    {
        if (!$this->reservation->contains($reservation)) {
            $this->reservation[] = $reservation;
            $reservation->addParkSpace($this);
        }

        return $this;
    }

    public function removeReservation(Reservations $reservation): self
    {
        if ($this->reservation->contains($reservation)) {
            $this->reservation->removeElement($reservation);
            $reservation->removeParkSpace($this);
        }

        return $this;
    }
}
