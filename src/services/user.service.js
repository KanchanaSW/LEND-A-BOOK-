import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/content/";

const getPublicContent = () => {
  return axios.get(API_URL + "all");
};
const getUserBoard = () => {
  return axios.get(API_URL + "user", { headers: authHeader() });
};
const getAdminBoard = () => {
  return axios.get(API_URL + "admin", { headers: authHeader() });
};
const getBronzeBoard = () => {
  return axios.get(API_URL + "bronze", { headers: authHeader() });
};
const getSilverBoard = () => {
  return axios.get(API_URL + "silver", { headers: authHeader() });
};
const getGoldBoard = () => {
  return axios.get(API_URL + "gold", { headers: authHeader() });
};
const getPlatinumBoard = () => {
  return axios.get(API_URL + "platinum", { headers: authHeader() });
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getPublicContent,
  getUserBoard,
  getAdminBoard,
  getBronzeBoard,
  getSilverBoard,
  getGoldBoard,
  getPlatinumBoard,
};
