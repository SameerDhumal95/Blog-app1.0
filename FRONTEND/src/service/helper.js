import axios from "axios";

export const BASE_URL = "http://localhost:8080";

//axios provider
export const myAxios = axios.create({
  baseURL: BASE_URL,
});
