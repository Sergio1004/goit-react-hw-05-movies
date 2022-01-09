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
    <div>
      <Link type="button" to={locationState}>
        Go back
      </Link>

      {movie && (
        <div className={s.container}>
          <div className={s.movieCard}>
            <div className={s.movieImage}>
              {movie.poster_path && (
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.original_title}
                />
              )}
            </div>
            <div className={s.movieDescription}>
              <h2>{movie.original_title}</h2>
              <p>
                Vote/Votes: {movie.vote_average}/{movie.vote_count}
              </p>
              <h3>Overview</h3>
              <p>{movie.overview}</p>
              <h4>Genres</h4>
              {movie.genres.map(genre => {
                return (
                  <span key={genre.id} className="movie-genre">
                    {genre.name}
                  </span>
                );
              })}
            </div>
          </div>

          <h3>Additional information</h3>

          <Link
            to={{
              pathname: `/movies/${movieId}/cast`,
              state: { from: locationState },
            }}
          >
            Cast
          </Link>

          <Link
            to={{
              pathname: `/movies/${movieId}/reviews`,
              state: { from: locationState },
            }}
          >
            Reviews
          </Link>
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
