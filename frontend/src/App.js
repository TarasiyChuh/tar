// frontend/src/App.js
import React from 'react';
import './App.css';
import { Routes, Route, Link } from 'react-router-dom';
import Sidebar from './Sidebar';            // Компонент бокового меню
import Search from './Search';              // Компонент пошуку
import GameLibrary from './GameLibrary';    // Головна сторінка – бібліотека ігор
import Game1 from './components/Game1';     // Опис гри Forza Horizon 5
import Game2 from './components/Game2';     // Опис гри S.T.A.L.K.E.R. 2
import Game3 from './components/Game3';     // Опис гри Atomic Heart
import Game4 from './components/Game4';     // Опис гри Call of Duty: MWIII
import Register from './Register';          // Сторінка реєстрації
import Login from './Login';                // Сторінка логіну

function App() {
  return (
    <div className="app-container">
      {/* Завжди видно: Sidebar */}
      <Sidebar />

      {/* Завжди видно: Search */}
      <Search />

      <div className="main-content">
        {/* Навігація для логіну/реєстрації (можна додати інші посилання) */}
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          
        </div>

        {/* Область, де відображається контент за допомогою маршрутизації */}
        <Routes>
          <Route path="/" element={<GameLibrary />} />
          <Route path="/game1" element={<Game1 />} />
          <Route path="/game2" element={<Game2 />} />
          <Route path="/game3" element={<Game3 />} />
          <Route path="/game4" element={<Game4 />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
