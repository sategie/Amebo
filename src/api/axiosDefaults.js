import axios from "axios";

axios.defaults.baseURL = "https://amebo-drf-18f15fb7ee85.herokuapp.com/";
axios.defaults.headers.post["Content-Type"] = "multipart/form-data";
axios.defaults.withCredentials = true;

export const axiosReq = axios.create();
export const axiosRes = axios.create();