<?php

namespace App\Entity\Show;

use App\Entity\UploadedAtInterface;
use App\Entity\UploadedAtTrait;
use App\Repository\Show\FileRepository;
use Doctrine\ORM\Mapping as ORM;
use App\Entity\DatedInterface;
use App\Entity\DatedTrait;

#[ORM\Table(name: "show_file")]
#[ORM\Entity(repositoryClass: FileRepository::class)]
class File implements DatedInterface, UploadedAtInterface
{
    use DatedTrait;
    use UploadedAtTrait;

    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $name = null;

    #[ORM\Column(length: 255)]
    private ?string $extension = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $size = null;

    #[ORM\Column]
    private ?int $season = null;

    #[ORM\Column]
    private ?int $episode = null;

    #[ORM\ManyToOne(inversedBy: 'files')]
    private ?Show $fileShow = null;

    public function __construct()
    {
        $this->uploadedAt = new \DateTime();
        $this->createdAt = new \DateTime();
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

    public function getExtension(): ?string
    {
        return $this->extension;
    }

    public function setExtension(string $extension): self
    {
        $this->extension = $extension;

        return $this;
    }

    public function getSize(): ?string
    {
        return $this->size;
    }

    public function setSize(?string $size): self
    {
        $this->size = $size;

        return $this;
    }

    public function getSeason(): ?int
    {
        return $this->season;
    }

    public function setSeason(int $season): self
    {
        $this->season = $season;

        return $this;
    }

    public function getEpisode(): ?int
    {
        return $this->episode;
    }

    public function setEpisode(int $episode): self
    {
        $this->episode = $episode;

        return $this;
    }

    public function getFileShow(): ?Show
    {
        return $this->fileShow;
    }

    public function setFileShow(?Show $fileShow): self
    {
        $this->fileShow = $fileShow;

        return $this;
    }
}
