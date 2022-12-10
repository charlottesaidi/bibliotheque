import React from 'react';
import Error from '@components/Layout/ErrorLayout';

const Forbidden: React.FC = () => {

    return (
        <>
            <Error 
                code={403} 
                title={"Forbidden"} 
                message={"C'est mon coin, tu n'as rien a faire ici..."}
            />
        </>
    )
};

export default Forbidden;