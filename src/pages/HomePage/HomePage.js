import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { getTrendingMovie } from '../../Api/Api';

import s from './HomePage.module.css';

function Homepage() {
  const [movies, setMovies] = useState([]);
  const location = useLocation();

  useEffect(() => {
    getTrendingMovie().then(response => {
      setMovies(response.results);
    });
  }, []);

  return (
    <div className={s.container}>
      {movies && (
        <ul className={s.movieList}>
          {movies.map(movie => (
            <li key={movie.id} className={s.movieItem}>
              <Link
                to={{
                  pathname: `/movies/${movie.id}`,
                  state: { from: location },
                }}
                className={s.movieLink}
              >
                <div className={s.moviePosterWraper}>
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.original_title}
                    className={s.moviePoster}
                  />
                </div>

                <h4 className={s.movieTitle}>{movie.original_title}</h4>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Homepage;
