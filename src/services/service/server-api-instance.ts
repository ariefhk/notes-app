import axios from "axios";

export const serverApiInstance = axios.create({
  baseURL: process.env.SERVER_BASE_URL,
});
