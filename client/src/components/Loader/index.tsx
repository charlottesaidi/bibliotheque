import React, { FC } from 'react';

const Loader: FC = () => (
    <div className="flex justify-center items-center">
        <div className="spinner-border animate-spin inline-block w-10 h-10 border-6 rounded-full text-orange-600" role="status">
            <span className="visually-hidden">Loading...</span>
        </div>
    </div>
);

export default Loader;