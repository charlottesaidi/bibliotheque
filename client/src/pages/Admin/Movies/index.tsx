import React, { useEffect } from 'react';
import List from "@components/List";
import Loader from "@components/Loader";
import ErrorAlert from "@components/ErrorAlert";
import {get} from "@services/api/ViewerService";

const AdminMovies: React.FC = () => {
    const [files, setFiles] = React.useState<Array<any>>();
    const [error, setError] = React.useState<any>();
    const [loading, setLoading] = React.useState(true);

    useEffect(() => {
        fetchFiles();
    }, [])

    const fetchFiles = async () => {
        const res = await get('/movies', {storageKey: 'movies'});
        if(res.error) {
            setError(res.error);
        } else {
            const movies = res.data;
            const movieFiles : Array<any> = [];
            movies.forEach((movie: any) => {
                movieFiles.push(movie.file)
            })
            setFiles(movieFiles);
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

export default AdminMovies;