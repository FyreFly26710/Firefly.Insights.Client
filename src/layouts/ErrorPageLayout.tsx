import { Link } from 'react-router-dom';
import React from 'react';

type ErrorPageLayoutProps = {
    children?: React.ReactNode;
    headTitle?: string;
    title: string;
    message: string;
    button?: React.ReactNode;
};

export const ErrorPageLayout = ({ children, title, message, button }: ErrorPageLayoutProps) => {
    return (
        <div className='flex flex-col items-center justify-center h-screen'>
            <h1 className='text-4xl font-bold'>{title}</h1>
            <h2 className='lead'>{message}</h2>
            {children}
            {button ?? (
                <Link to='/' className='btn btn-link p-0 mb-2 mt-3'>
                    Go back to home
                </Link>
            )}
        </div>
    );
};
