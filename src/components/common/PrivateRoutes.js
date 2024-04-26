import { Outlet, Navigate } from 'react-router-dom';

const PrivateRoutes = () => {
    // Retrieve the token from local storage
    const token = localStorage.getItem('token');

    // Check if the token exists
    const isAuthenticated = token !== null;

    return (
        // If the user is authenticated, render the child routes
        // Otherwise, redirect the user to the login page
        isAuthenticated ? <Outlet /> : <Navigate to="/login" />
    );
};

export default PrivateRoutes;
