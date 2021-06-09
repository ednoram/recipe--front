import axios from "axios";

export const API_URL = process.env.API_URL || "";

export const API = axios.create({ baseURL: API_URL });
