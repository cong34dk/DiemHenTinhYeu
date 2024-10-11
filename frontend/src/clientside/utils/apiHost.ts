import axios from "axios";

const apiUrl = import.meta.env.VITE_API_KEY;

export const apiHost = axios.create({
    baseURL: apiUrl,
});