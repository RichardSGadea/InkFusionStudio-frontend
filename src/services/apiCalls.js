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

export const bringProfile = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const res = await axios.get(`${API_URL}/users/profile`,config)
    // console.log(res, "bringProfile");
    return res.data
}

export const updateProfile = async (data,token) =>{
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    // console.log(data, "yo soy data antes")
    const res = await axios.put(`${API_URL}/users/profile`,data,config)
    // console.log(res, "yo soy res")
    return res
}