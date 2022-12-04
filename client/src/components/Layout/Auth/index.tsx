import React, { FC } from 'react';

interface Props {
  children: React.ReactNode
}

const AuthLayout: FC<Props> = ({children}) => (
    <div className="grid">
        <div className="flex min-h-screen">
            <div className="card lg:w-1/3 w-5/6 mx-auto my-auto p-6 md:px-10">
                {children}
            </div>
        </div>
    </div>
);

export default AuthLayout;