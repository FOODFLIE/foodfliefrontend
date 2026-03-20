// src/services/partnerProductService.js
import partnerApiClient from "../utils/partnerApiClient";

// 1. Add Product
export const addProduct = async (productData) => {
  try {
    const response = await partnerApiClient.post("/api/partner/menu/add", productData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to add product");
  }
};

// 2. Get All Products (by Partner)
export const getAllProducts = async (partnerId) => {
  try {
    const response = await partnerApiClient.get(`/api/partner/menu?partner_id=${partnerId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch products");
  }
};

// 3. Get Product by ID
export const getProductById = async (id, partnerId) => {
  try {
    const response = await partnerApiClient.get(`/api/partner/menu/${id}?partner_id=${partnerId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch product details");
  }
};

// 4. Update Product
export const updateProduct = async (id, productData) => {
  try {
    const response = await partnerApiClient.put(`/api/partner/menu/${id}`, productData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to update product");
  }
};

// 5. Delete Product
export const deleteProduct = async (id, partnerId) => {
  try {
    const response = await partnerApiClient.delete(`/api/partner/menu/${id}`, {
      data: { partner_id: partnerId },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to delete product");
  }
};

// 6. Toggle Product Availability
export const toggleProductAvailability = async (id, partnerId, isAvailable) => {
  try {
    const response = await partnerApiClient.put(`/api/partner/menu/${id}`, {
      partner_id: partnerId,
      is_available: isAvailable,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to update availability");
  }
};

// 7. Get All Categories
export const getAllCategories = async () => {
  try {
    const response = await partnerApiClient.get("/api/partner/menu/categories/all");
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch categories");
  }
};

// 8. Get Products by Category
export const getProductsByCategory = async (partnerId, categoryId) => {
  try {
    const response = await partnerApiClient.get(`/api/partner/menu/${partnerId}/category/${categoryId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch category products");
  }
};
