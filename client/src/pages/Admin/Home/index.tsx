import React, { useEffect } from 'react';
import Loader from '@components/Loader';
import ErrorAlert from '@components/ErrorAlert';
import { isAdmin } from '@services/api/auth/AuthenticationService';
import {Link, useNavigate} from 'react-router-dom';
import folderIcon from '@assets/images/svgs/folder.svg';

const AdminHome: React.FC = () => {
	const admin = isAdmin(sessionStorage.getItem('token'));
    const navigate = useNavigate();

    const [folders, setFolders] = React.useState<Array<any>>();
    const [error] = React.useState<any>();
    const [loading, setLoading] = React.useState(true);

    useEffect(() => {
        if(!admin) {
            navigate('/forbidden');
        }
        fetchBooks();
    }, []);

    const fetchBooks = async () => {
        const folderArray = [];
        const books = sessionStorage.getItem('books');
        const tvShows = sessionStorage.getItem('tvShows');
        const movies = sessionStorage.getItem('movies');

        folderArray.push({'label': 'eBooks', 'files': books, 'link': 'books'});
        folderArray.push({'label': 'Films', 'files': movies, 'link': 'movies'});
        folderArray.push({'label': 'Série', 'files': tvShows, 'link': 'shows'});

        setFolders(folderArray);

        setLoading(false);
    };

    return (

            <div className="px-5">
            {
                loading ? <Loader/> :
                    !error ?
                        (<div className="mt-8 grid grid-cols-2 gap-20 p-2 md:grid-cols-4 lg:grid-cols-6 w-full h-full">
                            {folders?.map((item: any) => (
                                <p
                                    key={item.label}
                                >
                                    <Link to={item.link} className="text-center hover:opacity-50">
                                        <img src={folderIcon}/>
                                        <span>{item.label}</span>
                                    </Link>
                                </p>
                            ))}
                        </div>)
                     :
                        <ErrorAlert message={error}/>
            }
            </div>

    )
};

export default AdminHome;