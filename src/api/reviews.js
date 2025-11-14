import api from "./axiosConfig";

export const getReviews = () => api.get("/reviews");
export const getReview = (id) => api.get(`/reviews/${id}`);
export const createReview = (data) => api.post("/reviews", data);
export const updateReview = (id, data) => api.put(`/reviews/${id}`, data);
export const deleteReview = (id) => api.delete(`/reviews/${id}`);