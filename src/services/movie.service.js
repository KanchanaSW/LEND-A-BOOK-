import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/admin/";

class MovieService {
  deleteMovieDetails = (movieId) => {
    return axios.delete(API_URL + "deleteMovie/" + movieId, {
      headers: authHeader(),
    });
  };

  viewMovieDetails = (movieId) => {
    return axios.get(API_URL + "movie/" + movieId, { headers: authHeader() });
  };
  getSearchMovieByTitle = (title) => {
    return axios.get(API_URL + "movieByTitle/" + title, {
      headers: authHeader(),
    });
  };
  getMovieList = () => {
    return axios.get(API_URL + "movies", { headers: authHeader() });
  };
  // saerch movie
  searchMovie=(name)=>{
    return axios.get(API_URL + "movies/" + name, { headers: authHeader() });
  };
  postAddMovie = (movie) => {
    return axios.post(API_URL + "addMovie", movie, { headers: authHeader() });
  };
  putUpdateMovie = (movie, movieId)=>{
      return axios.put(API_URL+"updateMovie/"+movieId,movie,{headers:authHeader()});
  }
}
export default new MovieService();