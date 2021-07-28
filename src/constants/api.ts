import axios from "axios";

const API_URL = process.env.API_URL || "";

export const API = axios.create({ baseURL: API_URL, withCredentials: true });
