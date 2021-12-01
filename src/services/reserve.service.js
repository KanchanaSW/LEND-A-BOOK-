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

  getUserReserversList=()=>{
      return axios.get(API_URL + "userReserves",{headers:authHeader()});
  };
  deleteAResrve=(reserveId)=>{
      return axios.delete(API_URL + "deleteReserve/"+reserveId,{headers:authHeader()});
  };
}
export default new ReserveService();