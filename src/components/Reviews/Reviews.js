import { useEffect, useState } from 'react';
import { getReviews } from '../../services/movie-api';
import s from './Reviews.module.css';

export default function Reviews({ movieId }) {
  const [reviews, setReviews] = useState(null);

  useEffect(() => {
    getReviews(movieId).then(res => setReviews(res.results));
  }, [movieId]);

  return (
    <div>
      <ul>
        {reviews && reviews.length > 0 ? (
          reviews.map(({ id, author, content }) => (
            <li key={id} className={s.reviewItem}>
              <h3>Author: {author}</h3>
              <p className={s.reviewText}>{content}</p>
            </li>
          ))
        ) : (
          <li className={s.reviewItem}>
            We don't have any reviews for this movie
          </li>
        )}
      </ul>
    </div>
  );
}
