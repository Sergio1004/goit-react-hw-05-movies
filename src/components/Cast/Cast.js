import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { getMoviesCast } from '../../Api/Api';

import s from './Cast.module.css';

export default function Cast() {
  const { movieId } = useParams();

  const [cast, setCast] = useState([]);

  useEffect(() => {
    getMoviesCast(movieId).then(response => {
      setCast(response.cast);
    });
  }, [movieId]);

  return (
    <div>
      {cast && (
        <ul className={s.actors}>
          {cast.map(cast => (
            <li key={cast.cast_id}>
              {cast.profile_path && (
                <div className={s.actorCard}>
                  <img
                    src={`https://image.tmdb.org/t/p/w500${cast.profile_path}`}
                    alt={cast.name}
                  />
                </div>
              )}

              <p className={s.description}>{cast.name}</p>
              <p className={s.description}>Character: {cast.character}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
