import React, {ReactElement} from "react";
import {Entity} from "@models/interface/entity";
import {FieldValues, SubmitHandler} from "react-hook-form";
import {Data, FilterType} from "@services/Data/Data";
import Loader from "@components/Ui/Loader";
import Gallery from "@components/Gallery";
import FlashMessage from "@components/FlashMessage";
import usePagination from "@hooks/usePagination";
import {Paginate} from "@components/Pagination";

export interface listingProps<ResourceE extends Entity> {
    resources: Array<ResourceE>
    category?: string
}

export interface filterProps {
    onFilter: SubmitHandler<any>,
    onReset: any
}

type ListingControllerProps<ResourceE extends Entity> = {
    renderListing: (props: listingProps<ResourceE>) => ReactElement
    renderFilter?: (props: filterProps) => ReactElement
    data: Data<ResourceE>
    category?: string
    paginated?: boolean
}
export default function ListingController<ResourceE extends Entity>({...props}: ListingControllerProps<ResourceE>) {
    const [resources, setResources] = React.useState<Array<ResourceE>>([]);
    const [error, setError] = React.useState<any>('');
    const [loading, setLoading] = React.useState(true);
    const [filters, setFilters] = React.useState<FilterType>({})

    const itemsPerPage = 5;

    const paginatedResources = usePagination(resources, itemsPerPage);

    const onFilter = (data: any) => {
        const newFilters = Object.keys(data)
            .filter((key: keyof typeof data) => Boolean(data[key]))
            .reduce((acc, key) => ({...acc, ...{[key]: data[key]}}), {});

        setFilters(newFilters);
    }

    const onReset = () => {
        setFilters({});
    }

    React.useEffect(() => {
        if(!props.data.index) {
            setError('Une erreur est survenue');
        }
        setLoading(true)
        props.data.index?.(filters).then((response) => {
            setResources(response)
            setLoading(false)
        }).catch((err) => {
            console.log(err)
        })
    }, [props.data, filters])

    const category = props.category
    const _DATA = props.paginated ? paginatedResources.currentData() : resources;

    const filter = props.renderFilter ? props.renderFilter({onFilter, onReset}) : null;
    const listing = props.renderListing({resources: _DATA, category});
    const pagination = props.paginated ? Paginate({itemsPerPage, resources, paginatedResources}) : null

    return <>
        {filter}
        {
            loading ? <Loader/> :
                !error ? resources.length == 0 ? <FlashMessage message={'La bibliothèque est vide'} roleClass={'secondary'}/> :
                    <>{listing} {pagination}</>
                :
                <FlashMessage message={error} roleClass={'danger'}/>
        }
    </>
}