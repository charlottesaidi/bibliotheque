import {MovieInterface} from "@models/interface/movie";
import {Fichier} from "@models/Fichier";

export class Movie implements MovieInterface {
    [key: string]: any

    id: number
    file: Fichier
    author: string
    title: string
    cover: string
    release_date: Date
    created_at: Date
    updated_at: Date | null
    slug: string

    constructor(id: number, author: string, title: string, cover: string, file: Fichier, release_date: Date, created_at: Date, updated_at: Date | null, slug: string) {
        this.id = id;
        this.author = author;
        this.title = title;
        this.cover = cover;
        this.release_date = release_date;
        this.created_at = created_at;
        this.updated_at = updated_at;
        this.slug = slug;
        this.file = file
    }
}
