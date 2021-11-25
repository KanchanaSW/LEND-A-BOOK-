import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/users/";

class SubscriptionService {
  getSubscriptionsList = () => {
    return axios.get(API_URL + "subscription/all", { headers: authHeader() });
  };
  postSaveSubscription = (subscription) => {
    return axios.post(API_URL + "subscription/save", subscription, {
      headers: authHeader(),
    });
  };
 /*  putUpdateSubscription = (subscription) => {
    return axios.put(API_URL + "subscription/update", subscription, {
      headers: authHeader(),
    });
  }; */
  getSearchSubscription = (subscriptionId) => {
    return axios.get(API_URL + "subscription/find/" + subscriptionId, {
      headers: authHeader(),
    });
  };
  //update user subscription type
  // user function
  putUpdateSubscriptionType = (subscriptionId,id) => {
    return axios.put(API_URL + "subscription/updateType/" + subscriptionId + "/user/" + id, {
      headers: authHeader(),
    });
  };
  
  getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};
}
export default new SubscriptionService();



///reservatation dump
/* 
import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/admin/";

class ReservationService {
  postAddReservation = (reservation) => {
    return axios.post(API_URL + "addReservation", reservation, {
      headers: authHeader(),
    });
  };

  putUpdateReservation = (reservation, reservationId) => {
    return axios.put(API_URL + "updateReservation/" + reservationId,reservation,{headers:authHeader()});
  };

  getAllReservations=()=>{
      return axios.get(API_URL + "allReservation",{headers:authHeader()});
  };

  getMyReservations=()=>{
      return axios.get(API_URL + "allUserReservation",{headers:authHeader()});
  };

  viewReservation=(reservationId)=>{
      return axios.get(API_URL + "viewReservation/"+reservationId,{headers:authHeader()});
  };
}
export default new ReservationService();
*/