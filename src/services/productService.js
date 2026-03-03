import apiClient from "../utils/apiClient";

export const getProductsByCategory = async (categoryId) => {
  try {
    const response = await apiClient.get(
      `/api/customer-product/by-category?category_id=${categoryId}`,
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching products by category:", error);
    throw error;
  }
};

export const getProductsByPartner = async (partnerId) => {
  try {
    const response = await apiClient.get(
      `/api/customer-product/by-partner?partner_id=${partnerId}`,
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching products by partner:", error);
    throw error;
  }
};

export const getProductBySku = async (sku) => {
  try {
    const response = await apiClient.get(`/api/customer-product/sku/${sku}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching product by SKU:", error);
    throw error;
  }
};
export const getAllStores = async () => {
  try {
    const response = await apiClient.get("/api/customer-product/stores");
    return response.data;
  } catch (error) {
    console.error("Error fetching all stores:", error);
    throw error;
  }
};
