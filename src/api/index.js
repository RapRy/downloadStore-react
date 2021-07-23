import axios from "axios";

const baseUrl = axios.create({
  baseURL: "http://localhost:5000",
});

const users = "/users";
const contents = "/contents";

export const registerRoute = (formData) =>
  baseUrl.post(`${users}/register`, formData);

export const signUpRoute = (formData) =>
  baseUrl.post(`${users}/signup`, formData);

export const signInRoute = (formData) =>
  baseUrl.post(`${users}/signin`, formData);

export const getFeaturedContents = () => baseUrl.get(`${contents}/featured`);
