import { instance } from "../instance";

interface Products {
  id: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
  categories: number[];
}

export const createProduct = async (productData: Products) => {
  try {
    const response = await instance.post("/products", productData);
    if (response.status >= 200 && response.status < 300) {
      return response.data;
    } else {
      console.error("Unexpected status code:", response.status);
    }
  } catch (error) {
    throw error;
  }
};

export const getAllProducts = async () => {
  try {
    const response = await instance.get("/products");
    if (response.status >= 200 && response.status < 300) {
      return response.data;
    } else {
      console.error("Unexpected status code:", response.status);
    }
  } catch (error) {
    throw error;
  }
};

export const getAllProductsWithCategories = async () => {
  try {
    const response = await instance.get("products/get/categories");
    if (response.status >= 200 && response.status < 300) {
      return response.data;
    } else {
      console.error("Unexpected status code:", response.status);
    }
  } catch (error) {
    throw error;
  }
};

export const getProductById = async (id: number) => {
  try {
    const response = await instance.get(`/products/${id}`);
    if (response.status >= 200 && response.status < 300) {
      return response.data;
    } else {
      console.error("Unexpected status code:", response.status);
    }
  } catch (error) {
    throw error;
  }
};

export const getProductImageUrl = async (id: number) => {
  try {
    const response = await instance.get(`/products/image/${id}`);
    if (response.status >= 200 && response.status < 300) {
      return response.data;
    } else {
      console.error("Unexpected status code:", response.status);
    }
  } catch (error) {
    throw error;
  }
};

export const searchProduct = async (key: string) => {
  try {
    const response = await instance.post("/products/search", key, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.status >= 200 && response.status < 300) {
      return response.data;
    } else {
      console.error("Unexpected status code:", response.status);
    }
  } catch (error) {
    {
      throw error;
    }
  }
};
