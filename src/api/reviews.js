import api from "./axiosConfig";

export const getReviews = (postId) => api.get(`/posts/${postId}/comments`);
export const createReview = (postId, data) => api.post(`/posts/${postId}/comments`, data);
export const deleteReview = (commentId) => api.delete(`/comments/${commentId}`);