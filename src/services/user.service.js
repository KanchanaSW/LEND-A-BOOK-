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
const getAllUsers = () => {
  return axios.get(API_URL2 + "all", { headers: authHeader() });
};

const getUserDetails=(id)=>{
  return axios.get(API_URL2 + "user/"+id,{headers:authHeader()});
};

const updateUser=(id,password,fullname,dob,image)=>{
  return axios.put(API_URL2+"update-user",{id,password,fullname,dob,image} ,{headers:authHeader()});
};

 const putSubscription=(sub,subscriptionId)=>{
  return axios.post(API_URL2+"updateSubs/"+subscriptionId,sub,{headers:authHeader()});
} 

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getPublicContent,
  getUserBoard,
  getAdminBoard,
  getAllUsers,
  putSubscription,
  updateUser,
  getUserDetails,
};
