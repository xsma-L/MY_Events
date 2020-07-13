<?php

namespace App\Entity;

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
    public $id;

    /**
     * @ORM\Column(type="integer")
     */
    public $id_facebook;

    /**
     * @ORM\Column(type="string", length=255)
     */
    public $pseudo;

    /**
     * @ORM\Column(type="string", length=255)
     */
    public $email;

    /**
     * @ORM\Column(type="string", length=500, nullable=true)
     */
    public $avatar;

    /**
     * @ORM\Column(type="string", length=600, nullable=true)
     */
    public $bio;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getIdFacebook(): ?int
    {
        return $this->id_facebook;
    }

    public function setIdFacebook($id_facebook): self
    {
        $this->id_facebook = $id_facebook;

        return $this;
    }

    public function getPseudo(): ?string
    {
        return $this->pseudo;
    }

    public function setPseudo($pseudo): self
    {
        $this->pseudo = $pseudo;

        return $this;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail($email): self
    {
        $this->email = $email;

        return $this;
    }

    public function getAvatar(): ?string
    {
        return $this->avatar;
    }

    public function setAvatar($avatar): self
    {
        $this->avatar = $avatar;

        return $this;
    }

    public function getBio(): ?string
    {
        return $this->bio;
    }

    public function setBio($bio): self
    {
        $this->bio = $bio;

        return $this;
    }
}
