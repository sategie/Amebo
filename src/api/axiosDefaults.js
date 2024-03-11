import axios from "axios";

// Set default base URL for axios requests to point to the backend API
axios.defaults.baseURL = "https://amebo-drf-18f15fb7ee85.herokuapp.com/";
// Set default content type for POST requests. Useful when sending files to the server
axios.defaults.headers.post["Content-Type"] = "multipart/form-data";
// Ensure that cookies are sent and received with requests
axios.defaults.withCredentials = true;

// Axios instance for making generic requests
export const axiosReq = axios.create();
// Axios instance which can be configured independently of axiosReq
export const axiosRes = axios.create();