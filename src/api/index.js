import axios from "axios";

const baseUrl = axios.create({
  baseURL: "http://localhost:5000",
});

baseUrl.interceptors.request.use((req) => {
  if (localStorage.getItem("profile"))
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;

  return req;
});

const users = "/users";
const contents = "/contents";
const categories = "/categories";

// user routes
export const registerRoute = (formData) =>
  baseUrl.post(`${users}/register`, formData);

export const signUpRoute = (formData) =>
  baseUrl.post(`${users}/signup`, formData);

export const signInRoute = (formData) =>
  baseUrl.post(`${users}/signin`, formData);
// end user routes

// content routes
export const getFeaturedContents = () => baseUrl.get(`${contents}/featured`);
// end content routes

// category routes
export const getCategories = () => baseUrl.get(categories);
// end category routes
