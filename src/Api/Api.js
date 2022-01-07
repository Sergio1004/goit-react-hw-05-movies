const BASE_URL = 'https://api.themoviedb.org/3/';
const API_KEY = 'c98ea6b6701785f437faf7489bbb6d42';

const handleFetch = function (response) {
  return response
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      throw new Error(error.response.data.status_message);
    });
};

const getTrendingMovie = function () {
  return handleFetch(`${BASE_URL}/trending/movie/week?api_key=${API_KEY}`);
};

const getMoviesByQuery = function (query) {
  return handleFetch(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&language=en-US&page=1&include_adult=false&query=${query}`,
  );
};

const getMoviesById = function (movieId) {
  return handleFetch(
    `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=en-US`,
  );
};

const getMoviesCast = function (movieId) {
  return handleFetch(
    `${BASE_URL}/movie/${movieId}/credits?api_key=${API_KEY}&language=en-US`,
  );
};

const getMoviesReviews = function (movieId) {
  return handleFetch(
    `${BASE_URL}/movie/${movieId}/reviews?api_key=${API_KEY}&language=en-US&page=1`,
  );
};

export {
  getTrendingMovie,
  getMoviesByQuery,
  getMoviesById,
  getMoviesCast,
  getMoviesReviews,
};
