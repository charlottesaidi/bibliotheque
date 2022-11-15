import React, { useEffect } from 'react';
import List from "@components/List";
import Loader from "@components/Loader";
import ErrorAlert from "@components/ErrorAlert";
import {get} from "@services/api/ViewerService";

const AdminShows: React.FC = () => {
    const [files, setFiles] = React.useState<Array<any>>();
    const [error, setError] = React.useState<any>();
    const [loading, setLoading] = React.useState(true);

    useEffect(() => {
        fetchFiles();
    }, [])

    const fetchFiles = async () => {
        const res = await get('/shows', {storageKey: 'shows'});
        if(res.error) {
            setError(res.error);
        } else {
            const shows = res.data;
            const showFiles : Array<any> = [];
            shows.forEach((show: any) => {
                showFiles.push(show.file)
            })
            setFiles(showFiles);
            setError('')
        }
        setLoading(false);
    }

    return (
        <>
            {
                loading ? <Loader/> :
                    !error ? <List items={files}/> :
                        <ErrorAlert message={error}/>
            }
        </>
    )
};

export default AdminShows;