import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import * as movieAPI from '../../services/movie-api';
import { makeSlug } from '../../services/slug';
import s from './HomePage.module.css';

export default function BooksView() {
  const [movies, setMovies] = useState([]);

  const location = useLocation();

  useEffect(() => {
    movieAPI.getTrendingMovies().then(res => {
      setMovies(res.results);
    });
  }, []);

  return (
    <section className={s.homePage}>
      <div className={s.mainContainer}>
        <h2 className={s.title}>Trending Today</h2>

        <ul className={s.moviesList}>
          {movies.map(({ id, title, poster_path }) => (
            <li className={s.moviesList__item} key={id}>
              <Link
                to={{
                  pathname: `/movies/${makeSlug(`${title} ${id}`)}`,
                  state: {
                    from: {
                      location,
                      label: 'Back to Home',
                    },
                  },
                }}
              >
                <img
                  src={
                    poster_path
                      ? `https://image.tmdb.org/t/p/w300${poster_path}`
                      : 'https://pomogaetsrazu.ru/images/offers/2829219234.jpg'
                  }
                  alt={title}
                />
                <p className={s.moviesList__movieTitle}>{title}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
