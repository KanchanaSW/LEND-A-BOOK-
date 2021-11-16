import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/content/";
const API_URL2 = "http://localhost:8080/api/users/";

const getPublicContent = () => {
  return axios.get(API_URL + "all");
};
const getUserBoard = () => {
  return axios.get(API_URL + "user", { headers: authHeader() });
};
const getAdminBoard = () => {
  return axios.get(API_URL + "admin", { headers: authHeader() });
};
/////////////////////////////////////////////////////////////////
const getAllUsers=()=>{
  return axios.get(API_URL2+"all",{headers:authHeader()});
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getPublicContent,
  getUserBoard,
  getAdminBoard,
  getAllUsers,
};
