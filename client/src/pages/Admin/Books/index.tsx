import React, { useEffect } from 'react';
import List from "@components/List";
import Loader from "@components/Loader";
import ErrorAlert from "@components/ErrorAlert";
import {get} from "@services/api/ViewerService";
import Button from "@components/Button";

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
                    !error ?
                        <>
                            <div className={'flex flex-row justify-end items-center py-1 sm:px-6 lg:px-8'}>
                                <Button buttonLabel={'+'} buttonRole={'primary'} buttonLink={'/admin/books/new'} />
                            </div>
                            <List items={files}/>
                        </>
                        : <ErrorAlert message={error}/>
            }
        </>
    )
};

export default AdminBooks;