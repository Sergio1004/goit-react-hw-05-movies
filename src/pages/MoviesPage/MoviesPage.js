import { useEffect, useState } from 'react';
import { getMoviesByQuery } from '../../Api/Api';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import Searchbar from '../../components/Searchbar/Searchbar';

export default function MoviesPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const [movies, setMovies] = useState([]);
  const query = new URLSearchParams(location.search).get('query') ?? '';

  function handleSearchSubmit(searchQuery) {
    if (searchQuery !== query) {
      setMovies([]);
      navigate({ ...location, search: `query=${searchQuery}` });
    }
  }

  useEffect(() => {
    if (query === '') {
      setMovies([]);
      return;
    }

    getMoviesByQuery(query)
      .then(response => {
        setMovies(response.results);
      })
      .catch(error => {
        console.log(error);
      });
  }, [query]);

  return (
    <div className="container">
      <Searchbar onSubmit={handleSearchSubmit} />
      {movies && (
        <ul className="movie-list">
          {movies.map(movie => (
            <li key={movie.id} className="list-item">
              <Link
                to={{
                  pathname: `/movies/${movie.id}`,
                  state: {
                    from: location,
                  },
                }}
                className="movie-link"
              >
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.original_title}
                  className="movie-poster"
                />
                <h4 className="list-title">{movie.original_title}</h4>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
