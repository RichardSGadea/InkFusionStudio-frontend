import axios from "axios";

const API_URL = "http://localhost:4000/api";

export const loginCall = async (credentials) => {
    const res = await axios.post(`${API_URL}/auth/login`, credentials);
    return res
};

export const registerCall = async (credentials) => {
    const res = await axios.post(`${API_URL}/auth/register`, credentials);
    return res
}