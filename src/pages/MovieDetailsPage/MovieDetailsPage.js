import { useState, useEffect, Suspense, lazy } from 'react';
import { Link, useParams, useLocation, Routes, Route } from 'react-router-dom';

import { getMoviesById } from '../../Api/Api';

import s from './MovieDetailsPage.module.css';

const Cast = lazy(() => import('../../components/Cast/Cast'));
const Reviews = lazy(() => import('../../components/Reviews/Reviews'));

export default function MovieDetailsPage() {
  const location = useLocation();

  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [locationState, setLocationState] = useState(() => {
    return location?.state?.from ?? '/';
  });

  useEffect(() => {
    getMoviesById(movieId).then(response => {
      setMovie(response);
    });
  }, [movieId]);

  return (
    <div className={s.container}>
      <Link type="button" to={locationState} className={s.backButton}>
        Go back
      </Link>

      {movie && (
        <div className={s.cardWrapper}>
          <div className={s.movieCard}>
            <div className={s.movieImageWrapper}>
              {movie.poster_path && (
                <img
                  className={s.movieImage}
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.original_title}
                />
              )}
            </div>
            <div className={s.movieDescription}>
              <h2 className={s.movieTitle}>{movie.original_title}</h2>
              <p className={s.vote}>
                Vote/Votes: {movie.vote_average}/{movie.vote_count}
              </p>
              <h3 className={s.title}>Overview</h3>
              <p className={s.overview}>{movie.overview}</p>
              <h3 className={s.title}>Genres</h3>
              {movie.genres.map(genre => {
                return (
                  <span key={genre.id} className={s.movieGenre}>
                    {genre.name}
                  </span>
                );
              })}
            </div>
          </div>

          <div className={s.informationWrapper}>
            <h4>Additional information</h4>

            <div className={s.information}>
              <Link
                to={{
                  pathname: `/movies/${movieId}/cast`,
                  state: { from: locationState },
                }}
                className={s.cast}
              >
                Cast
              </Link>

              <Link
                to={{
                  pathname: `/movies/${movieId}/reviews`,
                  state: { from: locationState },
                }}
                className={s.reviews}
              >
                Reviews
              </Link>
            </div>
          </div>
        </div>
      )}

      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="cast" element={movie && <Cast movieId={movieId} />} />
          <Route
            path="reviews"
            element={movie && <Reviews movieId={movieId} />}
          />
        </Routes>
      </Suspense>
    </div>
  );
}
