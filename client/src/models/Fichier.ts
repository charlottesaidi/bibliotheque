import {FichierInterface} from "@models/interface/fichier";

export class Fichier implements FichierInterface {
    [key: string]: any

    id: number
    type: string
    name: string
    extension: string
    size: number
    created_at: Date
    updated_at: Date | null

    constructor(id: number, type: string, name: string, extension: string, size: number, created_at: Date, updated_at: Date | null) {
        this.id = id;
        this.type = type;
        this.name = name;
        this.extension = extension;
        this.size = size;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }
}