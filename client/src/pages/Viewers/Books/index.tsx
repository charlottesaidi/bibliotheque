import React, { useEffect } from 'react';
import Gallery from '@components/Gallery';
import { get } from '@services/api/ViewerService';
import Loader from '@components/Loader';
import ErrorAlert from '@components/ErrorAlert';
import Filter from "@components/Form/Filter";
import {RequestOptions} from "@services/api/core";
import CollapsibleItem from "@components/Collapsible/CollapsibleItem";
import Collapsible from "@components/Collapsible";

const Books: React.FC = () => {
    const [books, setBooks] = React.useState<any>();
    const [error, setError] = React.useState<any>();
    const [loading, setLoading] = React.useState(true);

    const fetchBooks = async (options: RequestOptions) => {
        const response = await get('/books', options);

        if (response.error) {
            setError(response.error);
        } else if (response.data) {
            setBooks(response.data);
            setError('');
        }
        setLoading(false);
    };

    const search = (data: any) => {
        setLoading(true);
        const filters = Object.keys(data)
            .filter((key: keyof typeof data) => Boolean(data[key]))
            .reduce((acc, key) => ({...acc, ...{[key]: data[key]}}), {});

        fetchBooks({storageKey: 'filteredBooks', apiParams: filters});
    }

    const onReset = () => {
        setBooks(JSON.parse(sessionStorage.getItem('books') || '{}'))
    }

    useEffect(() => {
        fetchBooks({storageKey: 'books'})
    }, []);

    return (
        <>
            <div className={'flex flex-col m-7 shadow-lg'}>

                <Collapsible
                    accordionId={'search_accordion'}
                    accordionItems={
                        <CollapsibleItem
                            title={'Recherche'}
                            dataBsParent={'search_accordion'}
                            headingId={'search_title'}
                            collapsibleId={'search_collapsible'}
                            headingClasses={'bg-orange-600 text-white'}>
                            <Filter onFilter={search} onReset={() => onReset()} />
                        </CollapsibleItem>
                    }
                />

            </div>

            {
                loading ? <Loader/> :
                    !error ? <Gallery items={books} category="livres"/> :
                    <ErrorAlert message={error}/>
            }
        </>
    )
};

export default Books;