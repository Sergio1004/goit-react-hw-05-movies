import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

import { getMoviesReviews } from '../../Api/Api';

export default function Reviews() {
  const { movieId } = useParams();

  const [reviews, setReviews] = useState([]);

   useEffect(() => {
     getMoviesReviews(movieId).then(response => {
       setReviews(response.results);
     });
   }, [movieId]);
  
  return (
    <div>
      {reviews.length !== 0 ? (
        <ul>
          {reviews.map(review => (
            <li key={review.id}>
              <h4>Aothor:{review.author}</h4>
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

