import {Entity} from "@models/interface/entity";
import {normalizeParameter, Serialize} from "@models/interface/serialize";

export type FilterType = {
    [key: string]: any
}

export interface Data<E extends Entity> {
    index?(filters?: FilterType): Promise<Array<E>>
    update?(resource: E): Promise<boolean>
    delete?(resource: E): Promise<boolean>
}

export abstract class AbstractApiData<E extends Entity> implements Data<E> {
    abstract index(): Promise<Array<E>>
}

export abstract class AbstractSessionStorageData<E extends Entity> implements Data<E>, Serialize<E> {
    abstract index(): Promise<Array<E>>
    abstract serialize(self: E): string;
    abstract normalize(self: normalizeParameter<E>): E;

    private readonly localAccessKey: string;

    protected constructor(localAccessKey: string) {
        this.localAccessKey = localAccessKey
    }

    get resources(): Array<E> {
        const localData = sessionStorage.getItem(this.localAccessKey);

        if (!localData) {
            return [];
        }

        const parsedData = JSON.parse(localData);

        if (parsedData.length) {
            return parsedData.map(this.normalize);
        }

        return parsedData;
    }

    set resources(resources : Array<E>) {
        sessionStorage.setItem(this.localAccessKey, JSON.stringify(resources));
    }
}