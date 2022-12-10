import React, { useEffect } from 'react';
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

    useEffect(() => {
        const folderArray = [];

        folderArray.push({'label': 'eBooks', 'link': 'livres'});
        folderArray.push({'label': 'Films', 'link': 'films'});
        folderArray.push({'label': 'Série', 'link': 'series'});

        setFolders(folderArray);
    }, []);

    return (

        <div className="">
            <div className="mt-8 grid grid-cols-2 gap-20 p-2 md:grid-cols-4 lg:grid-cols-6 w-full h-full">
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
            </div>
        </div>

    )
};

export default Dashboard;