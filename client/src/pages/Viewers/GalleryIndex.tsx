import React, {useEffect} from "react";
import {RequestOptions} from "@services/api/core";
import {get} from "@services/api/ViewerService";
import Collapsible from "@components/Collapsible";
import CollapsibleItem from "@components/Collapsible/CollapsibleItem";
import Filter from "@components/Form/Filter";
import Loader from "@components/Loader";
import Gallery from "@components/Gallery";
import ErrorAlert from "@components/ErrorAlert";

interface fetchResources {
    apiPath: string,
    storageKey: string,
    filterStorageKey: string,
    galleryCategory?: string
}

const GalleryIndex = ({...props}: fetchResources) => {
    const [resources, setResources] = React.useState<any>();
    const [error, setError] = React.useState<any>();
    const [loading, setLoading] = React.useState(true);

    const fetchResources = async (options: RequestOptions) => {
        const response = await get(props.apiPath, options);

        if (response.error) {
            setError(response.error);
        } else if (response.data) {
            setResources(response.data);
            setError('');
        }
        setLoading(false);
    };

    const search = (data: any) => {
        setLoading(true);
        const filters = Object.keys(data)
            .filter((key: keyof typeof data) => Boolean(data[key]))
            .reduce((acc, key) => ({...acc, ...{[key]: data[key]}}), {});

        fetchResources({storageKey: props.filterStorageKey, apiParams: filters});
    }

    const onReset = () => {
        sessionStorage.removeItem(props.filterStorageKey)
        setResources(JSON.parse(sessionStorage.getItem(props.storageKey) || '{}'))
    }

    useEffect(() => {
        fetchResources({storageKey: props.storageKey})
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
                            headingClasses={'primary'}>
                            <Filter onFilter={search} onReset={() => onReset()} />
                        </CollapsibleItem>
                    }
                />

            </div>

            {
                loading ? <Loader/> :
                    !error ? <Gallery items={resources} category={props.galleryCategory || ''}/> :
                        <ErrorAlert message={error}/>
            }
        </>
    )
}

export default GalleryIndex;