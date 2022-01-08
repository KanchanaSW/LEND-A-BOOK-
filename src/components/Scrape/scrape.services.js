import axios from "axios";
import authHeader from "../../services/auth-header";

const API_URL = "http://localhost:8080/api/scrape/";

class ScrapeService {
  getScrapeBooks = () => {
    return axios.get(API_URL + "booksData", { headers: authHeader() });
  };

  getScrapeMovies = () => {
    return axios.get(API_URL + "movieData", { headers: authHeader() });
  };
}
export default new ScrapeService();
