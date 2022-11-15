import React, { FC } from 'react';

interface Props {
  message: string
}

const ErrorAlert: React.FC<Props> = ({message}) => (
  <div className="mt-3 p-3 leading-normal text-red-700 border border-red-500" role="alert">
    <p>{message}</p>
  </div>
);

export default ErrorAlert;
