import React, {useEffect} from "react";
import Loader from "@components/Loader";
import List from "@components/List";
import ErrorAlert from "@components/ErrorAlert";
import {get} from "@services/api/ViewerService";
import Forbidden from "@pages/Error/ForbiddenPage";
import {isAdmin} from "@services/api/auth/AuthenticationService";

interface ApiListingProps {
    apiGetPath: string,
    key?: string,
    appUploadPath?: string
    apiDeletePath?: string
}

const ListingIndex = ({...props}: ApiListingProps) => {
    const admin = isAdmin(sessionStorage.getItem('token'));

    if(!admin) {
        return <Forbidden/>
    }

    const [files, setFiles] = React.useState<Array<any>>();
    const [error, setError] = React.useState<any>();
    const [loading, setLoading] = React.useState(true);

    useEffect(() => {
        fetchFiles();
    }, [])

    const fetchFiles = async () => {
        const res = await get(props.apiGetPath, {storageKey: props.key});
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
        !error ? <List items={files} uploadUrl={props.appUploadPath} deletePath={props.apiDeletePath}/> :
            <ErrorAlert message={error}/>
}

export default ListingIndex;