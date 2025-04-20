import axios from "axios";

const API = axios.create({
  baseURL: "https://krmu-backend.vercel.app/api", // Your backend base URL
  //   baseURL: "http://localhost:3000/api",
  withCredentials: true,
});

// Request interceptor to add auth token to requests
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
API.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.data) {
      return Promise.reject(
        error.response.data.message || "Something went wrong"
      );
    }
    return Promise.reject(error.message);
  }
);

export default API;
