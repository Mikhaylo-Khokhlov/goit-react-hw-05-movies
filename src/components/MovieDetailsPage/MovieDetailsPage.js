import { useState, useEffect, Suspense } from 'react';
import {
  useParams,
  useNavigate,
  useLocation,
  NavLink,
  Route,
  Routes,
} from 'react-router-dom';
import * as movieAPI from '../../services/movie-api';
import { getIdFromSlug } from '../../services/slug';
import Cast from '../Cast';
import Reviews from '../Reviews';
import Loader from '../Loader';
import s from './MovieDetailsPage.module.css';

export default function MovieDetailsPage() {
  const [movie, setMovie] = useState(null);
  const { movieId } = useParams();
  const movieIdSlug = getIdFromSlug(movieId);

  const location = useLocation();
  const history = useNavigate();

  const goBack = () => {
    history('/');
  };

  useEffect(() => {
    movieAPI.getMovieById(movieIdSlug).then(setMovie);
  }, [movieIdSlug]);

  return (
    <>
      {movie && (
        <section className={s.movieDetialsSection}>
          <div className={s.mainContainer}>
            <button
              type="button"
              onClick={goBack}
              className={s.movieDetails__button}
            >
              {location?.state?.from?.label ?? 'Find another movie'}
            </button>

            <div className={s.movieCard}>
              <div className={s.posterContainer}>
                <img
                  src={
                    movie.poster_path
                      ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
                      : 'https://pomogaetsrazu.ru/images/offers/2829219234.jpg'
                  }
                  alt={movie.title}
                />
              </div>

              <div className={s.descrContainer}>
                <h2 className={s.movieCard__title}>
                  {movie.title} ({movie.release_date.slice(0, 4)})
                </h2>
                <p className={s.movieCard__text}>
                  User score: {movie.vote_average}
                </p>

                <h3>Overview</h3>
                <p className={s.movieCard__text}>
                  {movie.overview ? movie.overview : 'No overwies yet'}
                </p>

                <h3>Genres</h3>
                <p>{movie.genres.map(genre => genre.name).join(', ')}</p>
              </div>
            </div>

            <div className={s.additionalInfo}>
              <h3>Additional Information</h3>
              <ul className={s.additionalInfo__list}>
                <li className={s.additionalInfo__item}>
                  <NavLink to="cast">Cast</NavLink>
                </li>
                <li className={s.additionalInfo__item}>
                  <NavLink to="reviews">Reviews</NavLink>
                </li>
              </ul>
              <Suspense fallback={<Loader />}>
                <Routes>
                  <Route path="cast" element={<Cast movieId={movieIdSlug} />} />
                  <Route
                    path="reviews"
                    element={<Reviews movieId={movieIdSlug} />}
                  />
                </Routes>
              </Suspense>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
