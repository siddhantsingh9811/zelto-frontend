import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Main from './components/Main';
import Navbar from './components/Navbar';

function App() {
  return (
    <div className="App">
      <Main/>
      <Navbar/>
    </div>
  );
}

export default App;
