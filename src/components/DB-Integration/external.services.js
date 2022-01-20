import axios from "axios";
import authHeader from "../../services/auth-header";

const API_URL = "http://localhost:8080/api/external/";

class ExternalDBService {
    /* BOOK SERVICE */
  getEXternalBooks = () => {
    return axios.get(API_URL + "books", { headers: authHeader() });
  };
  searchBook = (id) => {
    return axios.get(API_URL + "books/" + id, { headers: authHeader() });
  };
  addEXBook = (id) => {
    return axios.get(API_URL + "book/" + id, { headers: authHeader() });
  };

  /* MOVIE SERVICES */
  getExternalMovies = () => {
    return axios.get(API_URL + "movies", { headers: authHeader() });
  };
  searchMovie = (id) => {
    return axios.get(API_URL + "movies/" + id, { headers: authHeader() });
  };
  addEXMovie = (id) => {
    return axios.get(API_URL + "movie/" + id, { headers: authHeader() });
  };
}
export default new ExternalDBService();
