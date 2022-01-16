import axios from "axios";
import authHeader from "../../services/auth-header";

const API_URL = "http://localhost:8080/api/csv/";
const API_URL2 = "http://localhost:8080/api/admin/";

class CSVService {
  getCSVBooksNew = () => {
    return axios.get(API_URL + "csvBooks", { headers: authHeader() });
  };

  getCSVBooksExists = () => {
    return axios.get(API_URL + "csvBooksExists", { headers: authHeader() });
  };

  getCSVBookById = (bookId) => {
    return axios.get(API_URL + "csvBook/" + bookId, { headers: authHeader() });
  };
  postCSVAddBook = (book) => {
    return axios.post(API_URL2 + "addCSVBook", book, { headers: authHeader() });
  };
}
export default new CSVService();
