import apiClient from "../utils/apiClient";

export const fetchCategories = async () => {
  try {
    const response = await apiClient.get("/api/category");

    return response.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};

export const getCategories = fetchCategories;
