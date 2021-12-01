import axios from 'axios';

const API_KEY = '74a210d9545ac2133ea9f3ec78679de8';
axios.defaults.baseURL = 'https://api.themoviedb.org/3/';
axios.defaults.params = {
  api_key: API_KEY,
};

export const getTrendingMovies = async () => {
  try {
    const response = await axios.get(`/trending/movie/week`);
    const data = response.data;
    return data;
  } catch (e) {
    console.log(e);
  } finally {
    //
  }
};

export const getSearchedMovies = async (query, page = 1) => {
  try {
    const response = await axios.get(`/search/movie`, {
      params: {
        language: 'en-US',
        query: query,
        page: page,
        include_adult: false,
      },
    });
    const data = response.data;
    return data;
  } catch (e) {
    console.log(e);
  } finally {
    //
  }
};

export const getMovieById = async id => {
  try {
    const response = await axios.get(`/movie/${id}&language=en-US`);
    const data = response.data;
    return data;
  } catch (e) {
    console.log(e);
  } finally {
    //
  }
};

export const getMovieCast = async movieId => {
  try {
    const queryString = `movie/${movieId}/credits?language=en-US`;
    const data = await axios.get(queryString);
    return data.data;
  } catch (e) {
    console.log(e);
  } finally {
    //
  }
};

export const getReviews = async movieId => {
  try {
    const queryString = `movie/${movieId}/reviews?language=en-US`;
    const data = await axios.get(queryString);

    return data.data;
  } catch (e) {
    console.log(e);
  } finally {
    //
  }
};
