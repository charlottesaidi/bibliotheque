import React from 'react';
import Error from '@components/Layout/Error';

const NotFound: React.FC = () => {

    return (
        <>
            <Error 
                code={404} 
                title={"Page not found"} 
                message={"The page you are looking for doesn't exist or has been removed."} 
            />
        </>
    )
};

export default NotFound;