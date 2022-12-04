import React, { useEffect } from 'react';
import Gallery from '@components/Gallery';
import {get} from '@services/api/ViewerService';
import Loader from '@components/Loader';
import FlashMessage from '@components/FlashMessage';

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
            <h2 className="sm:text-4xl text-3xl title-font md:mb-20 mb-10">Derniers ajouts</h2>
            {
                loading ? <Loader/> :
                    !error ?
                        latestPublications.map((publication: any) => (
                            <section key={publication.category} className={'pb-10'}>
                                <Gallery pageTitle={publication.name} items={publication.items} category={publication.category}/>
                            </section>
                        ))
                        :
                        <FlashMessage message={error} roleClass={'danger'}/>
            }
        </>
    )
};

export default Home;