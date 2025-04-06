// GameDetails.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function GameDetails() {
  const { gameId } = useParams();
  const [game, setGame] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState('');
  const [loading, setLoading] = useState(false);

  // Стан для рейтингу
  const [userRating, setUserRating] = useState(0);
  const [averageRating, setAverageRating] = useState('0.00');
  const [votes, setVotes] = useState(0);
  const [ratingError, setRatingError] = useState('');

  // Функція для завантаження коментарів з сервера
  const fetchComments = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/comments/${gameId}`);
      const data = await response.json();
      setComments(data);
    } catch (error) {
      console.error('Помилка при отриманні коментарів:', error);
    }
  };

  // Функція для отримання гри з сервера
  const fetchGame = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/games/${gameId}`);
      const data = await response.json();
      setGame(data);
    } catch (error) {
      console.error('Помилка при отриманні деталей гри:', error);
    }
  };

  // Функція для отримання поточного рейтингу гри
  const fetchRating = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/games/${gameId}/rating`);
      const data = await response.json();
      setAverageRating(data.averageRating);
      setVotes(data.votes);
    } catch (err) {
      console.error("Помилка отримання рейтингу:", err);
      setRatingError("Помилка отримання рейтингу");
    }
  };

  // Завантаження гри, коментарів та рейтингу при першому рендері
  useEffect(() => {
    fetchGame();
    fetchComments();
    fetchRating();
  }, [gameId]);

  // Обробка встановлення рейтингу
  const handleRating = async (value) => {
    setUserRating(value);
    setRatingError('');
    // Отримуємо дані користувача з localStorage
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (!storedUser) {
      setRatingError('Користувач не авторизований!');
      return;
    }
    const userId = storedUser.id || storedUser._id;

    try {
      const response = await fetch(`http://localhost:5000/api/games/${gameId}/rating`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, rating: value })
      });
      if (!response.ok) {
        const errorData = await response.json();
        setRatingError(errorData.message || "Невідома помилка");
      } else {
        // Після успішного оновлення перезавантажуємо рейтинг
        await fetchRating();
      }
    } catch (err) {
      console.error("Помилка при встановленні рейтингу:", err);
      setRatingError("Помилка при встановленні рейтингу");
    }
  };

  // Обробка відправки коментаря
  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) {
      console.log('Коментар порожній!');
      return;
    }
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (!storedUser) {
      console.error('Користувач не авторизований!');
      return;
    }
    const userId = storedUser.id || storedUser._id;

    setLoading(true);
    const newComment = { comment: commentText, userId, gameId };

    try {
      const response = await fetch('http://localhost:5000/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newComment),
      });
      if (!response.ok) {
        throw new Error(`Помилка сервера: ${response.status}`);
      }
      await fetchComments();
      setCommentText('');
    } catch (error) {
      console.error('Помилка при додаванні коментаря:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!game) {
    return <p>Завантаження гри...</p>;
  }

  return (
    <div className="game-details-container">
      <div className="game-page">
        <div className="content-container">
          <img className="game-image" src={game.photo} alt={`Зображення ${game.title}`} />
        </div>
        <div className="game-info2">
          <h1>{game.title}</h1>
          <p>{game.description}</p>
          <p><strong>Жанр:</strong> {game.genre}</p>
          {/* Секція рейтингу */}
          <div className="rating-section">
            <h3>Рейтинг: {averageRating} ({votes} голосів)</h3>
            <div>
              {[1, 2, 3, 4, 5].map((num) => (
                <button key={num}
                  onClick={() => handleRating(num)}
                  style={{
                    margin: '0 5px',
                    backgroundColor: num <= userRating ? 'gold' : 'lightgray',
                    border: 'none',
                    padding: '10px',
                    borderRadius: '5px',
                    cursor: 'pointer'
                  }}>
                  {num}⭐
                </button>
              ))}
            </div>
            {ratingError && <p style={{ color: 'red' }}>{ratingError}</p>}
          </div>
          <button className="download-button">Завантажити</button>
        </div>
      </div>

      <div className="comments-section">
        <h2>Коментарі</h2>
        <form className="comment-form" onSubmit={handleCommentSubmit}>
          <textarea
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Напишіть коментар..."
            disabled={loading}
          />
          <button type="submit" disabled={loading}>
            {loading ? 'Додаємо...' : 'Додати коментар'}
          </button>
        </form>

        <div className="comments-list">
          {comments.map((comment) => (
            <div className="comment" key={comment._id}>
              <p>
                <strong>{comment.userId?.username || 'Анонім'}</strong>: {comment.comment}
              </p>
              <p>{new Date(comment.createdAt).toLocaleString()}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default GameDetails;
