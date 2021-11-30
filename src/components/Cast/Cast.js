import React, { useEffect, useState } from 'react';
import { getMovieCast } from '../../services/movie-api';
import s from './Cast.module.css';

export default function Cast({ movieId }) {
  const [cast, setCast] = useState(null);

  useEffect(() => {
    getMovieCast(movieId).then(res => setCast(res.cast));
  }, [movieId]);

  return (
    <div>
      <ul className={s.castList} id="cast">
        {cast &&
          cast.map(({ id, profile_path, original_name, character }) => (
            <li key={id} className={s.castItem}>
              <img
                src={
                  profile_path
                    ? `https://image.tmdb.org/t/p/w300${profile_path}`
                    : 'https://pomogaetsrazu.ru/images/offers/2829219234.jpg'
                }
                alt={original_name}
              />
              <div className={s.itemDescr}>
                <p className={s.personName}>{original_name}</p>
                <p className={s.character}>Character: {character}</p>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
}
