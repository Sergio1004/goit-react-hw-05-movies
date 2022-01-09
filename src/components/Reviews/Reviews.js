import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

import { getMoviesReviews } from '../../Api/Api';

import s from './Reviews.module.css';

export default function Reviews() {
  const { movieId } = useParams();

  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    getMoviesReviews(movieId).then(response => {
      setReviews(response.results);
    });
  }, [movieId]);

  return (
    <div className={s.container}>
      {reviews.length !== 0 ? (
        <ul className={s.reviews}>
          {reviews.map(review => (
            <li key={review.id} className={s.review}>
              <h4>Aothor: {review.author}</h4>
              <p>{review.content}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>We don't have any reviews for this movie</p>
      )}
    </div>
  );
}
