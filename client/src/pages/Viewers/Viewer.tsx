import React, { useEffect } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import { get } from '@services/api/ViewerService';
import Loader from '@components/Loader';
import FlashMessage from '@components/FlashMessage';
import Ebook from '@components/Ebook';
import {BookFileTypes, VideoFileTypes} from "@constants/resource";

interface ApiViewerProps {
    apiPath: string,
}

const bookFileTypes: Array<BookFileTypes> = [];
const videoFileTypes: Array<VideoFileTypes> = [];

Object.entries(BookFileTypes).map(([, value]) => {bookFileTypes.push(value)})
Object.entries(VideoFileTypes).map(([, value]) => {videoFileTypes.push(value)})

function Viewer(file: any) {
    return bookFileTypes.find((type) => type == file.type) ?
        <Ebook file={file} /> : bookFileTypes.find((type) => type == file.type) ?
            <div className="mt-3 leading-normal text-blue-700 border border-blue-500" role="info">
                <p>Composant vidéo en cours de développement...</p>
            </div> :
                <FlashMessage message={'Une erreur est survenue : extension de fichier inconnu'} roleClass={'danger'}/>
}

const ViewerPage = ({...props}: ApiViewerProps) => {
    const [resource, setResource] = React.useState<any>();
    const [error, setError] = React.useState<any>();
    const [loading, setLoading] = React.useState<boolean>(true);

    const location = useLocation();
    const pathnames = location.pathname.split('/');
    const slugParam = pathnames[pathnames.length - 1];

    const navigate = useNavigate();

    useEffect(() => {
        const fetchResource = async () => {
            const response = await get(props.apiPath, {routeParam: slugParam});
            if (response.error) {
                response.code == '404' ? navigate('/not-found') : setError(response.error);
            } else if (response.data) {
                setResource(response.data);
                setError('');
            }
            setLoading(false);
        }

        fetchResource();
    }, []);

    return (
        <>
            {
                loading ?
                    <Loader/>
                    : !error ?
                        Viewer(resource.file)
                        : <FlashMessage message={error} roleClass={'danger'}/>
            }

        </>
    )
};


export default ViewerPage;