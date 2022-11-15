<?php

namespace App\Entity;

interface UploadedAtInterface
{
    public function getUploadedAt(): ?\DateTime;

    public function setUploadedAt(?\DateTime $uploadedAt): self;
}