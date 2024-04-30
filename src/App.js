import React from 'react';
import Main from './components/Main';
import Navbar from './components/Navbar';
import { useLocation } from 'react-router-dom';

function App() {
  const location = useLocation();

  const isPrivateRoute = () => {
    const privateRoutes = [
      '/home',
      '/history',
      '/profile', 
      '/cart',
      '/vendor', 
      '/checkout',
      '/splash' 
    ];
    return privateRoutes.some(path => location.pathname.startsWith(path));
  };

  return (
    <div className="App">
       {/* Conditional Navbar Rendering */}
      <Main /> 
      {isPrivateRoute() && <Navbar />}
    </div>
  );
}

export default App;
