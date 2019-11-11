<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\ReservationsRepository")
 */
class Reservations
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="datetime")
     */
    private $reservationDate;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Users", inversedBy="reservations")
     * @ORM\JoinColumn(nullable=false)
     */
    private $userReservation;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getReservationDate(): ?\DateTimeInterface
    {
        return $this->reservationDate;
    }

    public function setReservationDate(\DateTimeInterface $reservationDate): self
    {
        $this->reservationDate = $reservationDate;

        return $this;
    }

    public function getReservationUser(): ?Users
    {
        return $this->userReservation;
    }

    public function setReservationUser(?Users $userReservation): self
    {
        $this->userReservation = $userReservation;

        return $this;
    }
}
