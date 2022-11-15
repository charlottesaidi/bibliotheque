import React, { useEffect } from 'react';
import List from "@components/List";
import Loader from "@components/Loader";
import ErrorAlert from "@components/ErrorAlert";
import {get} from "@services/api/ViewerService";

const AdminBooks: React.FC = () => {
    const [files, setFiles] = React.useState<Array<any>>();
    const [error, setError] = React.useState<any>();
    const [loading, setLoading] = React.useState(true);

    useEffect(() => {
        fetchFiles();
    }, [])

    const fetchFiles = async () => {
        const res = await get('/books', {storageKey: 'books'});
        if(res.error) {
            setError(res.error);
        } else {
            const books = res.data;
            const bookFiles : Array<any> = [];
            books.forEach((book: any) => {
                bookFiles.push(book.file)
            })
            setFiles(bookFiles);
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

export default AdminBooks;