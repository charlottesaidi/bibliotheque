
import {AbstractSessionStorageData, FilterType} from "@services/Data/Data";
import {Book} from "@models/Book";
import {normalizeParameter} from "@models/interface/serialize";
import {Core} from "@services/api/core";

function wait(time: number) {
    return new Promise((resolve) => setTimeout(resolve, time))
}

const api = new Core();

class BookStorageData extends AbstractSessionStorageData<Book> {
    constructor() {
        super('Book')
    }

    serialize(data: Book) {
        return JSON.stringify(data);
    }

    normalize(data: normalizeParameter<Book>) {
        if (typeof data === 'string') {
            data = JSON.parse(data);

            if (typeof data === 'string') {
                throw new Error('Cannot normalise string into instance of Book')
            }
        }

        return new Book(
            data.id,
            data.author,
            data.title,
            data.cover,
            data.file,
            data.publication_date,
            data.created_at,
            data.updated_at,
            data.slug
        )
    }

    async index(filters?: FilterType): Promise<Array<Book>> {
        let resources = this.resources;

        if (resources.length === 0) {

            api.get('/books', {})
                .then(res => {
                    resources = res.data;
                }).catch(err => {
                    return [{'code': err && err.code || err, 'error': err && err.message|| err}]
                });

            this.resources = resources;
        }

        await wait(1000);

        return resources.filter((resource) => {
            if (!filters) {
                return true;
            }
            if (
                filters.author
                && resource.author
                && resource.author.toLowerCase().indexOf(filters.author.toLowerCase()) === -1
            ) {
                return false;
            }

            if (
                filters.title
                && resource.title
                && resource.title.toLowerCase().indexOf(filters.title.toLowerCase()) === -1
            ) {
                return false;
            }

            // if (
            //     filters.genre
            //     && resource.genre
            //     && resource.genre.toLowerCase().indexOf(filters.genre.toLowerCase()) === -1
            // ) {
            //     return false;
            // }

            return true;
        });
    }
}

export default new BookStorageData();