<?php

namespace App\Repository;

use App\Entity\Book\Book;
use App\Entity\File;
use App\Entity\Genre;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Book>
 *
 * @method Book|null find($id, $lockMode = null, $lockVersion = null)
 * @method Book|null findOneBy(array $criteria, array $orderBy = null)
 * @method Book[]    findAll()
 * @method Book[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class BookRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Book::class);
    }

    public function save(Book $entity, bool $flush = false): void
    {
        $this->getEntityManager()->persist($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    public function remove(Book $entity, bool $flush = false): void
    {
        $this->getEntityManager()->remove($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    public function createBook(string $author, string $title, File $file, string $cover, Genre $genre, string $publicationDate): Book
    {
        $book = new Book();

        $book->setTitle($title)
            ->setAuthor($author)
            ->setFile($file)
            ->setCover($cover)
            ->setPublicationDate(new \DateTime($publicationDate))
            ->addGenre($genre);

        $this->save($book, true);

        return $book;
    }

    /**
     * @return Book[] Returns an array of every Book objects found in database
     */
    public function getAll(): array {
        return $this->createQueryBuilder('b') 
            ->select('b, f')
            ->innerJoin('b.file', 'f')
            ->orderBy('b.id', 'DESC')
            ->getQuery()->getArrayResult();
    }

    /**
     * @return Book[] Returns an array of latest Book objects found in database
     */
    public function getLastUploadedBooks(int $limit): array {
        return $this->createQueryBuilder('b') 
            ->select('b, f')
            ->innerJoin('b.file', 'f')
            ->orderBy('b.id', 'DESC')
            ->setMaxResults($limit)
            ->getQuery()->getArrayResult();
    }

    /**
     * @return Book[] Returns an array of Book by title
     */
    public function getSearchedBooks(?string $title, ?string $author, ?Genre $genre): array {
        $query = $this->createQueryBuilder('b') 
            ->select('b, f, g')
            ->innerJoin('b.file', 'f')
            ->innerJoin('b.genres', 'g');

        if($title) {
            $query->where('b.title LIKE :title')
                ->setParameter('title', '%'.$title.'%');
        } elseif($author) {
            $query->where('b.author LIKE :author')
                ->setParameter('author', '%'.$author.'%');
        } elseif($genre) {
            $query->where(':genre MEMBER OF b.genres')
                ->setParameter(':genre', $genre);
        } elseif($title && $author) {
            $query->where('b.title LIKE :title')
                ->andWhere('b.author LIKE :author')
                ->setParameters(['title' => '%'.$title.'%', 'author' => '%'.$author.'%']);
        }

        return $query->orderBy('b.id', 'DESC')
            ->getQuery()->getArrayResult();
    }

   /**
    * @return Book Returns an array of Book objects
    */
   public function findOneBySlug(string $slug): ?Book
   {
       return $this->createQueryBuilder('b')
           ->andWhere('b.slug = :slug')
           ->setParameter('slug', $slug)
           ->getQuery()
           ->getOneOrNullResult()
       ;
   }

//    public function findOneBySomeField($value): ?Book
//    {
//        return $this->createQueryBuilder('b')
//            ->andWhere('b.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
