import axios from "axios";

const API_URL = "http://localhost:8080/api/auth/";

const register = (email, password, fullname, dob, image, isBlacklisted) => {
  return axios.post(API_URL + "signup", {
    email,
    password,
    fullname,
    dob,
    image,
    isBlacklisted,
  });
};

const login = (email, password) => {
  return axios
    .post(API_URL + "signin", {
      email,
      password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
  localStorage.clear();
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

export default {
  register,
  login,
  logout,
  getCurrentUser,
};
