import { instance } from "../instance";

export const getCategoriesByIds = async (ids: number[]) => {
  try {
    const response = await instance.get("/categories/getby/ids", {
      params: { ids: ids.join(",") },
    });
    if (response.status >= 200 && response.status < 300) {
      return response.data;
    } else {
      console.error("Unexpected status code:", response.status);
    }
  } catch (error) {
    throw error;
  }
};

export const getAllCategories = async () => {
  try {
    const response = await instance.get("/categories");
    if (response.status >= 200 && response.status < 300) {
      return response.data;
    } else {
      console.error("Unexpected status code:", response.status);
    }
  } catch (error) {
    throw error;
  }
};
