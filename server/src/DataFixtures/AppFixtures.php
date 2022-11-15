<?php

namespace App\DataFixtures;

use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use App\Entity\Book\Book;
use App\Entity\Book\File;
use App\Entity\Genre;
use App\Entity\User;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface; 

class AppFixtures extends Fixture
{
    const BOOK_FILES_DATA = [
        ['type' => 'epub', 'name' => 'Leviathan_Wakes_Expanse_1_-_James_S_A_Corey', 'extension' => 'epub', 'size' => 577536],
        ['type' => 'epub', 'name' => 'Caliban_39_s_War_Expanse_2_-_James_S_A_Corey', 'extension' => 'epub', 'size' => 2342912],
        ['type' => 'epub', 'name' => 'Abaddon_39_s_Gate_Expanse_3_-_James_S_A_Corey', 'extension' => 'epub', 'size' => 618496],
        ['type' => 'epub', 'name' => 'Cibola_Burn_Expanse_4_-_James_S_A_Corey', 'extension' => 'epub', 'size' => 528384],
        ['type' => 'epub', 'name' => 'Nemesis_Games_Expanse_5_-_James_S_A_Corey', 'extension' => 'epub', 'size' => 2023424],
        ['type' => 'epub', 'name' => 'Babylon_s_Ashes_Expanse_6_-_James_S_A_Corey', 'extension' => 'epub', 'size' => 2342912],
        ['type' => 'epub', 'name' => 'Strange_Dogs_Expanse_6_5_-_James_S_A_Corey', 'extension' => 'epub', 'size' => 221184],
        ['type' => 'epub', 'name' => 'Persepolis_Rising_Expanse_7_-_James_S_A_Corey', 'extension' => 'epub', 'size' => 1286144],
        ['type' => 'pdf', 'name' => 'Tiamat_s_wrath_expanse_8_James_s_a_corey', 'extension' => 'pdf', 'size' => 2428928],
        ['type' => 'epub', 'name' => 'Leviathan_Falls_by_James_S_A_Corey', 'extension' => 'epub', 'size' => 2158592]
    ];
    const BOOKS_DATA = [
        ['author' => 'James S.A Corey', 'title' => 'The Expanse 1 - Leviathan Wakes', 'cover' => 'leviathanswake.jpg', 'publicationDate' => '01-01-2011 00:00:00'],
        ['author' => 'James S.A Corey', 'title' => 'The Expanse 2 - Caliban\'s War', 'cover' => 'calibanswar.jpg', 'publicationDate' => '01-01-2012 00:00:00'],
        ['author' => 'James S.A Corey', 'title' => 'The Expanse 3 - Abaddon\'s Gate', 'cover' => 'abaddonsgate.jpg', 'publicationDate' => '01-01-2013 00:00:00'],
        ['author' => 'James S.A Corey', 'title' => 'The Expanse 4 - Cibola Burn', 'cover' => 'cibolaburn.jpg', 'publicationDate' => '01-01-2014 00:00:00'],
        ['author' => 'James S.A Corey', 'title' => 'The Expanse 5 - Nemesis Games', 'cover' => 'nemesisgame.jpg', 'publicationDate' => '01-01-2015 00:00:00'],
        ['author' => 'James S.A Corey', 'title' => 'The Expanse 6 - Babylon\'s Ashes', 'cover' => 'babylonsashes.jpg', 'publicationDate' => '01-01-2016 00:00:00'],
        ['author' => 'James S.A Corey', 'title' => 'The Expanse - Strange Dogs', 'cover' => 'strangedogs.jpg', 'publicationDate' => '01-01-2017 00:00:00'],
        ['author' => 'James S.A Corey', 'title' => 'The Expanse 7 - Persepolis Rising', 'cover' => 'persepolisrising.jpg', 'publicationDate' => '01-01-2017 00:00:00'],
        ['author' => 'James S.A Corey', 'title' => 'The Expanse 8 - Tiamat\'s Wrath', 'cover' => 'tiamathswrath.jpg', 'publicationDate' => '01-01-2019 00:00:00'],
        ['author' => 'James S.A Corey', 'title' => 'The Expanse 9 - Leviathan Falls', 'cover' => 'leviathansfall.jpg', 'publicationDate' => '01-01-2021 00:00:00'],
    ];

    public function __construct(private UserPasswordHasherInterface $passwordHasher) {}

    public function load(ObjectManager $manager): void
    {
        $userAdmin = self::saveAdmin('charlotte.saidi@outlook.fr', '!', $this->passwordHasher);
        $manager->persist($userAdmin);

        $sciFy = self::saveGenre('sci-fy', 'Science-Fiction');
        $manager->persist($sciFy);

        $histoire = self::saveGenre('histoire', 'Histoire');
        $manager->persist($histoire);

        $thriller = self::saveGenre('thriller', 'Thriller');
        $manager->persist($thriller);

        foreach(self::BOOK_FILES_DATA as $key => $value) {
            $file = self::saveFile($value['type'], $value['name'], $value['extension'], $value['size']);
            $manager->persist($file);

            $book = self::saveBook(self::BOOKS_DATA[$key]['author'], self::BOOKS_DATA[$key]['title'], $file, self::BOOKS_DATA[$key]['cover'], $sciFy, self::BOOKS_DATA[$key]['publicationDate']);
            $manager->persist($book);
        }

        $manager->flush();
    }

    private static function saveBook(string $author, string $title, File $file, string $cover, Genre $genre, string $publicationDate): Book
    {
        $book = new Book();

        $book->setTitle($title)
            ->setAuthor($author)
            ->setFile($file)
            ->setCover($cover)
            ->setPublicationDate(new \DateTime($publicationDate))
            ->addGenre($genre);
        
        return $book;
    }

    private static function saveFile(string $type, string $name, string $extension, float $size): File 
    {
        $file = new File();

        $file->setType($type)
            ->setName($name)
            ->setExtension($extension)
            ->setSize($size)
            ->setUploadedAt(new \DateTime());
        
        return $file;
    }

    private static function saveGenre(string $label, string $name): Genre
    {
        $genre = new Genre();
        $genre->setLabel($label)
            ->setName($name);
        
        return $genre;
    }

    private static function saveAdmin(string $username, string $password, UserPasswordHasherInterface $passwordHasher): User 
    {
        $user = new User();
        
        $user->setEmail($username)
            ->setPassword($passwordHasher->hashPassword(
                $user,
                $password
            ))
            ->setRoles(["ROLE_ADMIN"]);

        return $user;
    }
}
