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

export const updateProfile = (formData) =>
  baseUrl.put(`${users}/update/profile`, formData);

export const updateSecurity = (formData) =>
  baseUrl.put(`${users}/update/security`, formData);

export const updateSettings = (formData) =>
  baseUrl.put(`${users}/update/settings`, formData);

export const deactivateAccount = (id) =>
  baseUrl.put(`${users}/deactivate/${id}`);

export const getActivities = ({ id, source }) =>
  baseUrl.get(`${users}/activities/${id}`, { cancelToken: source.token });
// end user routes

// content routes
export const getFeaturedContents = () => baseUrl.get(`${contents}/featured`);
// end content routes

// category routes
export const getCategories = () => baseUrl.get(categories);
// end category routes
