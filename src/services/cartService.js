import apiClient from "../utils/apiClient";

export const addToCart = async (sku, quantity) => {
  const response = await apiClient.post("/api/cart/add", { sku, quantity });
  return response.data;
};

export const getCart = async () => {
  const response = await apiClient.get("/api/cart/");
  return response.data;
};

export const updateCartItem = async (cartItemId, quantity) => {
  const response = await apiClient.put(`/api/cart/${cartItemId}`, { quantity });
  return response.data;
};

export const removeFromCart = async (cartItemId) => {
  const response = await apiClient.delete(`/api/cart/${cartItemId}`);
  return response.data;
};

export const syncGuestCart = async (items) => {
  const response = await apiClient.post("/api/cart/sync", { items });
  return response.data;
};
