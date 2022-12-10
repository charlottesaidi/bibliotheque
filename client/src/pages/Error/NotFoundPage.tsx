import React from 'react';
import Error from '@components/Layout/ErrorLayout';

const NotFound: React.FC = () => {

    return (
        <>
            <Error 
                code={404} 
                title={"Page introuvable"}
                message={"La page n'existe pas ou a été supprimée."}
            />
        </>
    )
};

export default NotFound;