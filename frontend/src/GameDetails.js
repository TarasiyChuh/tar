import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function GameDetails() {
  const { gameId } = useParams();
  const [game, setGame] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState('');
  const [loading, setLoading] = useState(false);

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

  // Завантаження гри та коментарів при першому рендері
  useEffect(() => {
    const fetchGame = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/games/${gameId}`);
        const data = await response.json();
        setGame(data);
      } catch (error) {
        console.error('Помилка при отриманні деталей гри:', error);
      }
    };

    fetchGame();
    fetchComments();
  }, [gameId]);

  // Обробка відправки коментаря
  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    console.log('Додаємо коментар...');

    if (!commentText.trim()) {
      console.log('Коментар порожній!');
      return;
    }

    // Отримуємо дані користувача з localStorage
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (!storedUser) {
      console.error('Користувач не авторизований!');
      return;
    }
    // Використовуємо user.id або user._id (залежно від того, як зберігається в бекенді)
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

      const data = await response.json();
      console.log('Відповідь сервера:', data);

      // Оновлюємо коментарі після успішного додавання
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
