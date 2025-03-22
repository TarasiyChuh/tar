import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 

function GameLibrary() {
  const [games, setGames] = useState([]);
  const navigate = useNavigate(); 

  useEffect(() => {
    fetch('http://localhost:5000/api/games')
      .then((res) => res.json())
      .then((data) => setGames(data))
      .catch((error) => console.error('Error fetching games:', error));
  }, []);

  const handleCardClick = (link) => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Будь ласка, увійди або зареєструйся, щоб переглядати деталі гри!');
      navigate('/login');
    } else {
      navigate(link);
    }
  };

  return (
    <div className="game-library">
      {games.map((game) => (
        <div
          key={game._id}
          className="game-card"
          onClick={() => handleCardClick(game.link)}
          style={{ cursor: 'pointer' }}
        >
          <img src={game.photo} alt={game.title} />
          <div className="game-info">
            <h2 className="game-title">{game.title}</h2>
            <p className="game-description">{game.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default GameLibrary;
