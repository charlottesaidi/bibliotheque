<?php

namespace App\Entity\Show;

use App\Entity\File;
use App\Repository\EpisodeRepository;
use Doctrine\ORM\Mapping as ORM;
use App\Entity\DatedInterface;
use App\Entity\DatedTrait;
use App\Entity\SlugInterface;
use App\Entity\SlugTrait;

#[ORM\Table(name: "show_episode")]
#[ORM\Entity(repositoryClass: EpisodeRepository::class)]
class Episode implements DatedInterface, SlugInterface
{
    use DatedTrait;
    use SlugTrait;

    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $title = null;

    #[ORM\Column]
    private ?int $number = null;

    #[ORM\Column]
    private ?int $season = null;

    #[ORM\OneToOne(cascade: ['persist', 'remove'])]
    #[ORM\JoinColumn(nullable: false)]
    private ?File $file;

    #[ORM\ManyToOne]
    #[ORM\JoinColumn(nullable: false)]
    private ?Show $show;

    #[ORM\Column(type: 'datetime', nullable: true)]
    protected ?\DateTime $releaseDate = null;

    public function __construct()
    {
        $this->slug = $this->slugify($this->title);
        $this->createdAt = new \DateTime();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTitle(): ?string
    {
        return $this->title;
    }

    public function setTitle(string $title): self
    {
        $this->title = $title;

        return $this;
    }

    public function getNumber(): ?int
    {
        return $this->number;
    }

    public function setNumber(int $number): self
    {
        $this->number = $number;

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

    public function getFile(): ?File
    {
        return $this->file;
    }

    public function setFile(File $file): self
    {
        $this->file = $file;

        return $this;
    }

    public function getShow(): ?Show
    {
        return $this->show;
    }

    public function setShow(Show $show): self
    {
        $this->show = $show;

        return $this;
    }

    public function getReleaseDate(): ?\DateTime
    {
        return $this->releaseDate;
    }

    public function setReleaseDate(?\DateTime $releaseDate): self
    {
        $this->releaseDate = $releaseDate;

        return $this;
    }
}
