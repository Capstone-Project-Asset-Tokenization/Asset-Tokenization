import React from 'react';
import { Link } from 'react-router-dom';
import notFoundImage from '../assets/not-found.png';

const NotFoundPage = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <img src={notFoundImage} alt="Page Not Found" className="w-64 mb-8" />
            <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
            <p className="text-lg mb-8">The page you are looking for does not exist.</p>
            <Link to="/" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Go to Home
            </Link>
        </div>
    );
};

export default NotFoundPage;
