import { Outlet, Navigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const PrivateRoutes = () => {
  const location = useLocation(); 
  const token = localStorage.getItem('token');
  const isAuthenticated = token !== null;

  const privateRoutePaths = ['/home', '/history', '/profile', '/cart', '/vendor', '/checkout', '/splash'];

  const isPrivateRoute = privateRoutePaths.some(path => location.pathname.startsWith(path)); 

  return (
    isAuthenticated && isPrivateRoute ? <Outlet /> : <Navigate to="/login" />
  );
};

export default PrivateRoutes;
