import React, { FC } from 'react';

interface Props {
  children: React.ReactNode
}

const AuthLayout: FC<Props> = ({children}) => (
    <div className="grid">
        <div className="flex min-h-screen">
            <div className="md:w-1/3 w-2/3 mx-auto my-auto p-8 md:px-10">
                {children}
            </div>
        </div>
    </div>
);

export default AuthLayout;