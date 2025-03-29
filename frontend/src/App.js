// App.js
import React from 'react';
import './App.css'; // Імпортуємо стилі
import { Routes, Route } from 'react-router-dom'; // Для маршрутизації
import Sidebar from './Sidebar'; // Бокова панель
import Search from './Search'; // Панель пошуку
import GameLibrary from './GameLibrary'; // Бібліотека ігор
import GameDetails from './GameDetails'; // Деталі гри
import Register from './Register'; // Реєстрація
import Login from './Login'; // Логін
import FreeGames from './FreeGames'; // Безкоштовні ігри

function App() {
  return (
    <div className="app-container">
      <Sidebar /> {/* Бокова панель */}
      <Search /> {/* Панель пошуку */}
      <div className="main-content">
        <Routes>
          {/* Основні маршрути */}
          <Route path="/" element={<GameLibrary />} /> {/* Головна сторінка з бібліотекою ігор */}
          <Route path="/game-details/:gameId" element={<GameDetails />} /> {/* Сторінка деталей гри */}
          <Route path="/register" element={<Register />} /> {/* Сторінка реєстрації */}
          <Route path="/login" element={<Login />} /> {/* Сторінка входу */}
          <Route path="/free-games" element={<FreeGames />} /> {/* Сторінка безкоштовних ігор */}
        </Routes>
      </div>
    </div>
  );
}

export default App;
