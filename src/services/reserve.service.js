import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/admin/";

class ReserveService {
  //reserve book or movie
  postReserve = (reserveTemp) => {
    return axios.post(API_URL + "reserve", reserveTemp, {
      headers: authHeader(),
    });
  };

  getUserBookReserve = (bookId) => {
    return axios.get(API_URL + "userBookReserve/" + bookId, {
      headers: authHeader(),
    });
  };

  getUserReserversList = () => {
    return axios.get(API_URL + "userReservesBooks", {
      headers: authHeader(),
    });
  };
  getUserReservesMovieList = () => {
    return axios.get(API_URL + "userReservesMovies", { headers: authHeader() });
  };
  deleteAResrve = (reserveId) => {
    return axios.delete(API_URL + "deleteReserve/" + reserveId, {
      headers: authHeader(),
    });
  };
}
export default new ReserveService();
