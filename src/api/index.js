import axios from 'axios';

export const baseUrl = axios.create({
    baseURL: "http://localhost:5000"
});

export const registerRoute = "/users/register";
export const signUpRoute = "/users/signup";