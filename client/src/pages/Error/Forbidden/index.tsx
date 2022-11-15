import React from 'react';
import Error from '@components/Layout/Error';

const Forbidden: React.FC = () => {

    return (
        <>
            <Error 
                code={403} 
                title={"Forbidden"} 
                message={"Not allowed in admin section"} 
            />
        </>
    )
};

export default Forbidden;