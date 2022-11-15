<?php

namespace App\Entity\Book;

use App\Entity\UploadedAtInterface;
use App\Entity\UploadedAtTrait;
use App\Repository\Book\FileRepository;
use Doctrine\ORM\Mapping as ORM;
use App\Entity\DatedInterface;
use App\Entity\DatedTrait;

#[ORM\Table(name: "book_file")]
#[ORM\Entity(repositoryClass: FileRepository::class)]
class File implements DatedInterface, UploadedAtInterface
{
    use DatedTrait;
    use UploadedAtTrait;

    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $type = null;

    #[ORM\Column(length: 255)]
    private ?string $name = null;

    #[ORM\Column(length: 255)]
    private ?string $extension = null;

    #[ORM\Column(nullable: true)]
    private ?float $size = null;

    #[ORM\OneToOne(mappedBy: 'file', cascade: ['persist', 'remove'])]
    private ?Book $book = null;

    public function __construct()
    {
        $this->uploadedAt = new \DateTime();
        $this->createdAt = new \DateTime();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getType(): ?string
    {
        return $this->type;
    }

    public function setType(?string $type): self
    {
        $this->type = $type;

        return $this;
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

    public function getSize(): ?float
    {
        return $this->size;
    }

    public function setSize(?float $size): self
    {
        $this->size = $size;

        return $this;
    }

    public function getBook(): ?Book
    {
        return $this->book;
    }

    public function setBook(?Book $book): self
    {
        // unset the owning side of the relation if necessary
        if ($book === null && $this->book !== null) {
            $this->book->setFile(null);
        }

        // set the owning side of the relation if necessary
        if ($book !== null && $book->getFile() !== $this) {
            $book->setFile($this);
        }

        $this->book = $book;

        return $this;
    }
}
