<?php

namespace App\Entity;

interface SlugInterface
{
    public function getSlug(): ?string;

    public function setSlug(?string $slug): void;

    public function slugify(?string $string): string;
}