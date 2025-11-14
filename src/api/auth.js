import api from "./axiosConfig";
import jwtDecode from "jwt-decode";

export const login = async (email, password) => {
    const response = await api.post("/login", { email, password });
return response.data;
};

export const registerUser = async (userData) => {
    const response = await api.post("/register", userData);
    return response.data;
};

export const decodeToken = (token) => {
    try {
    return jwtDecode(token);
    } catch (e) {
    return null;
    }
};