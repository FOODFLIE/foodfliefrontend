import apiClient from "../utils/apiClient";

export const fetchCategories = async (userLat, userLng) => {
  try {
    const response = await apiClient.post("/api/category", {
      userLat,
      userLng,
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};

export const getCategories = fetchCategories;
