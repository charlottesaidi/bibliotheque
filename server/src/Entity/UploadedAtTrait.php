<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

trait UploadedAtTrait
{
    #[ORM\Column(type: 'datetime', nullable: true)]
    protected ?\DateTime $uploadedAt = null;

    public function getUploadedAt(): ?\DateTime
    {
        return $this->uploadedAt;
    }

    public function setUploadedAt(?\DateTime $uploadedAt): self
    {
        $this->uploadedAt = $uploadedAt;

        return $this;
    }
}