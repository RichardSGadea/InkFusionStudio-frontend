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
    const res = await axios.get(`${API_URL}/users/profile`, config)
    
    return res.data
}

export const updateProfile = async (data, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    
    const res = await axios.put(`${API_URL}/users/profile`, data, config)
    return res
}

export const updateProfileById = async (data,id, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    
    const res = await axios.put(`${API_URL}/users/${id}`, data, config)
    return res
}

export const bringAllClients = async (token, page) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const res = await axios.get(`${API_URL}/users/allUsers/?page=${page}`, config)
    return res.data
}
export const bringAllWorkers = async (token, page) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const res = await axios.get(`${API_URL}/users/allWorkers/?page=${page}`, config)
    return res.data
}

export const bringOneUser = async (token,id) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const res = await axios.get(`${API_URL}/users/${id}`,config)
    return res.data
}
export const deleteUserById = async (token,id) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const res = await axios.delete(`${API_URL}/users/${id}`,config)
    return res
}

export const bringAppointmentsUsers = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const res = await axios.get(`${API_URL}/appointments/client/`, config)
    return res.data
}

export const bringAppointmentsWorkers = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const res = await axios.get(`${API_URL}/appointments/worker/`, config)
    return res.data
}

export const bringAllAppointments = async (token,page) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const res = await axios.get(`${API_URL}/appointments/general/?page=${page}`, config)
    return res.data
}

export const bringWorkers = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const res = await axios.get(`${API_URL}/users/workers`, config)
    return res.data.workers

}

export const bringPortfolios = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const res = await axios.get(`${API_URL}/users/portfolio`, config)
    return res.data.portfolios

}

export const createAppointment = async (data,token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const res = await axios.post(`${API_URL}/appointments/`, data,config);
    return res
}

export const bringOneAppointment = async (token,id) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const res = await axios.get(`${API_URL}/appointments/client/${id}`,config)
    return res.data
}

export const updateAppointmentById = async (data,id,token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const res = await axios.put(`${API_URL}/appointments/${id}`, data,config)
    return res
}

export const deleteAppointmentById = async (token,id) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const res = await axios.delete(`${API_URL}/appointments/${id}`,config)
    return res
}