import React, { useEffect } from 'react';
import Loader from '@components/Ui/Loader';
import FlashMessage from '@components/FlashMessage';
import {isAdmin, useToken} from '@services/api/auth/AuthenticationService';
import {Link} from 'react-router-dom';
import folderIcon from '@assets/images/svgs/folder.svg';
import Forbidden from "@pages/Error/ForbiddenPage";

const Dashboard: React.FC = () => {
    const { token } = useToken();

    if(!isAdmin(token)) {
        return <Forbidden/>
    }

    const [folders, setFolders] = React.useState<Array<any>>();
    const [error] = React.useState<any>();
    const [loading, setLoading] = React.useState(true);

    useEffect(() => {
        fetchBooks();
    }, []);

    const fetchBooks = async () => {
        const folderArray = [];
        const books = sessionStorage.getItem('books');
        const tvShows = sessionStorage.getItem('tvShows');
        const movies = sessionStorage.getItem('movies');

        folderArray.push({'label': 'eBooks', 'files': books, 'link': 'livres'});
        folderArray.push({'label': 'Films', 'files': movies, 'link': 'films'});
        folderArray.push({'label': 'Série', 'files': tvShows, 'link': 'series'});

        setFolders(folderArray);

        setLoading(false);
    };

    return (

        <div className="">
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
                        <FlashMessage message={error} roleClass={'danger'}/>
            }
        </div>

    )
};

export default Dashboard;