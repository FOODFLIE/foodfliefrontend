import apiClient from "../utils/apiClient";

export const placeOrder = async (address, payment_method, cookingInstructions = null) => {
  const payload = {
    address,
    payment_method,
  };
  
  if (cookingInstructions) {
    payload.cooking_instructions = cookingInstructions;
  }
  
  const response = await apiClient.post("/api/order/place", payload);
  return response.data;
};

export const getCustomerOrders = async () => {
  const response = await apiClient.get("/api/order/");
  return response.data;
};

export const getOrderById = async (orderId) => {
  const response = await apiClient.get(`/api/order/${orderId}`);
  return response.data;
};
