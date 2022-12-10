import {BookInterface} from "@models/interface/book";
import {Fichier} from './Fichier';

export class Book implements BookInterface {
    [key: string]: any

    id: number
    file: Fichier
    author: string
    title: string
    cover: string
    publication_date: Date
    created_at: Date
    updated_at: Date | null
    slug: string

    constructor(id: number, author: string, title: string, cover: string, file: Fichier, publication_date: Date, created_at: Date, updated_at: Date | null, slug: string) {
        this.id = id;
        this.author = author;
        this.title = title;
        this.cover = cover;
        this.publication_date = publication_date;
        this.created_at = created_at;
        this.updated_at = updated_at;
        this.slug = slug;
        this.file = file
    }
}
