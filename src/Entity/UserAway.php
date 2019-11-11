<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\UserAwayRepository")
 */
class UserAway
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
    private $awayStartDate;

    /**
     * @ORM\Column(type="datetime")
     */
    private $awayEndDate;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Users", inversedBy="userAways")
     * @ORM\JoinColumn(nullable=false)
     */
    private $awayUser;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getAwayStartDate(): ?\DateTimeInterface
    {
        return $this->awayStartDate;
    }

    public function setAwayStartDate(\DateTimeInterface $awayStartDate): self
    {
        $this->awayStartDate = $awayStartDate;

        return $this;
    }

    public function getAwayEndDate(): ?\DateTimeInterface
    {
        return $this->awayEndDate;
    }

    public function setAwayEndDate(\DateTimeInterface $awayEndDate): self
    {
        $this->awayEndDate = $awayEndDate;

        return $this;
    }

    public function getAwayUser(): ?Users
    {
        return $this->awayUser;
    }

    public function setAwayUser(?Users $awayUser): self
    {
        $this->awayUser = $awayUser;

        return $this;
    }
}
