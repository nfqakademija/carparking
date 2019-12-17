<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\NotificationsRepository")
 */
class Notifications
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="smallint")
     */
    private $accepted;

    /**
     * @ORM\Column(type="smallint")
     */
    private $delivered;

    /**
     * @ORM\Column(type="smallint")
     */
    private $canceledAfterAccept;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Users", inversedBy="userNotifications")
     */
    private $user;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Users", inversedBy="guestNotifications")
     */
    private $guest;

    /**
     * @ORM\Column(type="datetime")
     */
    private $requestDate;


    public function getId(): ?int
    {
        return $this->id;
    }

    public function getAccepted(): ?string
    {
        return $this->accepted;
    }

    public function setAccepted(string $accepted): self
    {
        $this->accepted = $accepted;

        return $this;
    }

    public function getDelivered(): ?int
    {
        return $this->delivered;
    }

    public function setDelivered(int $delivered): self
    {
        $this->delivered = $delivered;

        return $this;
    }

    public function getCanceledAfterAccept(): ?int
    {
        return $this->delivered;
    }

    public function setCanceledAfterAccept(int $canceledAfterAccept): self
    {
        $this->canceledAfterAccept = $canceledAfterAccept;

        return $this;
    }


    public function getUser(): ?Users
    {
        return $this->user;
    }

    public function setUser(?Users $user): self
    {
        $this->user = $user;

        return $this;
    }

    public function getGuest(): ?Users
    {
        return $this->guest;
    }

    public function setGuest(?Users $guest): self
    {
        $this->guest = $guest;

        return $this;
    }

    public function getRequestDate(): ?\DateTimeInterface
    {
        return $this->requestDate;
    }

    public function setRequestDate(\DateTimeInterface $requestDate): self
    {
        $this->requestDate = $requestDate;

        return $this;
    }
}
