import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Main from './components/Main';
import Navbar from './components/Navbar';
import Login from './components/pages/Login'

function App() {
  return (
    <div className="App">
      {/* <Main/> */}
      {/* <Navbar/> */}
      <Login />
    </div>
  );
}

export default App;
