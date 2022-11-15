import React, { FC } from 'react';

interface Props {
  children: React.ReactNode
}

const AuthLayout: FC<Props> = ({children}) => (
    <div className="grid">
        <div className="flex bg-gradient-to-bl from-blue-800 to-orange-600 min-h-screen">
            <div className="md:w-1/3 w-2/3 mx-auto my-auto p-8 md:px-10 bg-white">
                {children}
            </div>
        </div>
    </div>
);

export default AuthLayout;