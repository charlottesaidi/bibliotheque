import React, { useEffect } from 'react';
import { useLocation, useMatches } from "react-router-dom";
import { get } from '@services/api/ViewerService';
import Loader from '@components/Loader';
import ErrorAlert from '@components/ErrorAlert';
import Ebook from '@components/Ebook';

const Book: React.FC = () => {
    const [book, setBook] = React.useState<any>();
    const [error, setError] = React.useState<any>();
    const [loading, setLoading] = React.useState<boolean>(true);

    const location = useLocation();
    const pathnames = location.pathname.split('/');
    const slugParam = pathnames[pathnames.length - 1];

    useEffect(() => {
        const fetchBook = async () => {
            const response = await get('/book', {routeParam: slugParam});
            if (response.error) {
                setError(response.error);
            } else if (response.data) {
                setBook(response.data);
                setError('');
            }
            setLoading(false);
        }
    
        fetchBook();
    }, []);

    return (
        <>
            {
                loading ? 
                    <Loader/> 
                : !error ? 
                    <Ebook file={book.file} />
                : <ErrorAlert message={error}/>
            }
            
        </>
    )
};

export default Book;