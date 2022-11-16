import React, {useEffect} from "react";
import Loader from "@components/Loader";
import List from "@components/List";
import ErrorAlert from "@components/ErrorAlert";
import {get} from "@services/api/ViewerService";

interface ApiListingProps {
    path: string,
    key?: string,
    appUploadPath?: string
}

const ListingIndex = ({...props}: ApiListingProps) => {
    const [files, setFiles] = React.useState<Array<any>>();
    const [error, setError] = React.useState<any>();
    const [loading, setLoading] = React.useState(true);

    useEffect(() => {
        fetchFiles();
    }, [])

    const fetchFiles = async () => {
        const res = await get(props.path, {storageKey: props.key});
        if(res.error) {
            res.code == '404' ? setError('') : setError(res.error);
        } else {
            const resources = res.data;
            const resourceFiles : Array<any> = [];
            resources.forEach((resource: any) => {
                resourceFiles.push(resource.file)
            })
            setFiles(resourceFiles);
            setError('')
        }
        setLoading(false);
    }
    
    return loading ? <Loader/> :
        !error ? <List items={files} uploadUrl={props.appUploadPath}/> :
            <ErrorAlert message={error}/>
}

export default ListingIndex;