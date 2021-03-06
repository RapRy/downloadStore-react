import axios from "axios";

const baseUrl = axios.create({
  baseURL: "https://downloadstoreportal.herokuapp.com/",
  // baseURL: "http://localhost:5000",
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
const reviews = "/reviews";

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

export const getUserData = (id, source) =>
  baseUrl.get(`${users}/userdata/${id}`, { cancelToken: source.token });
// end user routes

// content routes
export const getFeaturedContents = () => baseUrl.get(`${contents}/featured`);
export const getContentsByCat = (cat, source) =>
  baseUrl.get(`${contents}/${cat}?group=sub`, { cancelToken: source.token });
export const getContentDetails = (id, source) =>
  baseUrl.get(`${contents}/details/${id}`, { cancelToken: source.token });
export const getContentViaReviewId = (id) =>
  baseUrl.get(`${contents}/review/${id}`);
export const getContentsViaCommentId = (id) =>
  baseUrl.get(`${contents}/comment/${id}`);
// end content routes

// category routes
export const getCategories = (source) =>
  baseUrl.get(categories, { cancelToken: source.token });
// end category routes

// reviews routes
export const createReview = (formData) =>
  baseUrl.post(`${reviews}/createreview`, formData);

export const createComment = (formData) =>
  baseUrl.post(`${reviews}/createcomment`, formData);
// end reviews routes
