import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './Sidebar';   // Припускаємо, що ти вже створив цей компонент
import Search from './Search';     // І цей компонент також
import GameLibrary from './GameLibrary'; // Оновлений компонент бібліотеки ігор
import Game1 from './Game1';      // Опис гри Forza Horizon 5
import Game2 from './Game2';      // Опис гри S.T.A.L.K.E.R. 2
import Game3 from './Game3';      // Опис гри Atomic Heart
import Game4 from './Game4';      // Опис гри Call of Duty: MWIII

function App() {
  return (
    <Router>
      <div className="app-container">
        {/* Бокове меню */}
        <Sidebar />
        
        {/* Пошук */}
        <Search />

        <div className="main-content">
          {/* Маршрути для ігор */}
          <Routes>
            <Route path="/" element={<GameLibrary />} />
            <Route path="/game1" element={<Game1 />} />
            <Route path="/game2" element={<Game2 />} />
            <Route path="/game3" element={<Game3 />} />
            <Route path="/game4" element={<Game4 />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
