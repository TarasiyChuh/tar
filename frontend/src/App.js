// frontend/src/App.js
import React from 'react';
import './App.css';
import { Routes, Route, Link } from 'react-router-dom';
import Sidebar from './Sidebar';            
import Search from './Search';              
import GameLibrary from './GameLibrary';    
import Game1 from './components/Game1';     
import Game2 from './components/Game2';     
import Game3 from './components/Game3';     
import Game4 from './components/Game4';     
import Register from './Register';          
import Login from './Login'; 

import FreeGames from './FreeGames';


function App() {
  return (
    <div className="app-container">

      <Sidebar />

      <Search />

      <div className="main-content">

        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          
        </div>

        <Routes>
          <Route path="/" element={<GameLibrary />} />
          <Route path="/game1" element={<Game1 />} />
          <Route path="/game2" element={<Game2 />} />
          <Route path="/game3" element={<Game3 />} />
          <Route path="/game4" element={<Game4 />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/free-games" element={<FreeGames />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
