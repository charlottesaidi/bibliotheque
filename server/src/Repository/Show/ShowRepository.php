<?php

namespace App\Repository\Show;

use App\Entity\Show\Show;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Show>
 *
 * @method Show|null find($id, $lockMode = null, $lockVersion = null)
 * @method Show|null findOneBy(array $criteria, array $orderBy = null)
 * @method Show[]    findAll()
 * @method Show[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class ShowRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Show::class);
    }

    public function save(Show $entity, bool $flush = false): void
    {
        $this->getEntityManager()->persist($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    public function remove(Show $entity, bool $flush = false): void
    {
        $this->getEntityManager()->remove($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    /**
     * @return Show[] Returns an array of every Show objects found in database
     */
    public function getAll(): array {
        return $this->createQueryBuilder('s')
            ->select('s, f')
            ->innerJoin('s.files', 'f')
            ->orderBy('s.createdAt', 'DESC')
            ->getQuery()->getArrayResult();
    }

    /**
     * @return Show[] Returns an array of latest Show objects found in database
     */
    public function getLastUploadedShows(int $limit): array {
        return $this->createQueryBuilder('s')
            ->select('s, f')
            ->innerJoin('s.files', 'f')
            ->orderBy('s.updatedAt', 'DESC')
            ->setMaxResults($limit)
            ->getQuery()->getArrayResult();
    }

//    /**
//     * @return Show[] Returns an array of Show objects
//     */
//    public function findByExampleField($value): array
//    {
//        return $this->createQueryBuilder('s')
//            ->andWhere('s.exampleField = :val')
//            ->setParameter('val', $value)
//            ->orderBy('s.id', 'ASC')
//            ->setMaxResults(10)
//            ->getQuery()
//            ->getResult()
//        ;
//    }

//    public function findOneBySomeField($value): ?Show
//    {
//        return $this->createQueryBuilder('s')
//            ->andWhere('s.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
