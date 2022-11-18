import React, { useEffect } from 'react';
import Gallery from '@components/Gallery';
import {get} from '@services/api/ViewerService';
import Loader from '@components/Loader';
import ErrorAlert from '@components/ErrorAlert';

const requestOptions = {
    storageKey: 'latestPublications',
    apiParams: {'limit': '4'}
}

const Home = () => {
    const [latestPublications, setLatestPublications] = React.useState<any>();
    const [error, setError] = React.useState<any>();
    const [loading, setLoading] = React.useState(true);

    useEffect(() => {
        fetchLatestPublications();
    }, []);

    const fetchLatestPublications = async () => {
        const response = await get('/library/latest', requestOptions );
        if (response.error) {
            setError(response.error);
        } else if (response.data) {
            setLatestPublications(response.data);
            setError('');
        }
        setLoading(false);
    };

    return (
        <>
            <h2 className="px-5 sm:text-4xl text-3xl title-font">Derniers ajouts</h2>
            {
                loading ? <Loader/> :
                    !error ?
                        latestPublications.map((publication: any) => (
                            <section key={publication.category}>
                                <Gallery pageTitle={publication.name} items={publication.items} category={publication.category}/>
                            </section>
                        ))
                        :
                        <ErrorAlert message={error}/>
            }
        </>
    )
};

export default Home;