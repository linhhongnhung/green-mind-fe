import axios from "axios";

export const instance = axios.create({
  baseURL: "https://green-mind-be-production.up.railway.app",
});
