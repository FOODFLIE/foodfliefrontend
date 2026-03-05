import apiClient from "../utils/apiClient";



export const saveAddress = async (addressData) => {
  try {
    const response = await apiClient.post("/api/address/add", addressData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const fetchAddresses = async () => {
  try {
    const response = await apiClient.get(`/api/address/`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
