import {Entity} from "./entity";

export type normalizeParameter<E> = Extract<E, {[key: string]: any}> | string

export interface Serialize<SerializeE extends Entity> {
    normalize(self: normalizeParameter<SerializeE>): SerializeE
    serialize(self: SerializeE): string
}