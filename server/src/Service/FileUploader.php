<?php

namespace App\Service;

use Symfony\Component\String\Slugger\SluggerInterface;
use Symfony\Component\HttpFoundation\File\UploadedFile;

class FileUploader
{
    public function __construct(private SluggerInterface $slugger) {}

    /**
     * Charge un fichier et retourne un tableau contenant ses infos
     * @param UploadedFile $uploadedFile
     * @param string $uploadPath
     * @return array
     */
    public function uploadFile(UploadedFile $uploadedFile, string $uploadPath): array
    {
        $originalFilename = pathinfo($uploadedFile->getClientOriginalName(), PATHINFO_FILENAME);
        $safeFilename = $this->slugger->slug($originalFilename);
        $newFilename = $safeFilename.'-'.uniqid().'.'.$uploadedFile->guessExtension();

        $uploadedFile->move(
            $uploadPath,
            $newFilename
        );

        return [
            'name' => $newFilename,
            'extension' => $uploadedFile->guessExtension(),
            'size' => $uploadedFile->getSize()
        ];
    }
}