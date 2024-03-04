import { instance } from "../instance";

export const getCart = async (customerId: number) => {
  try {
    const response = await instance.get(`/cart/${customerId}`);
    if (response.status >= 200 && response.status < 300) {
      return response.data;
    } else {
      console.error("Unexpected status code:", response.status);
    }
  } catch (error) {
    throw error;
  }
};

export const addToCart = async (
  customerId: number,
  productId: number,
  quantity: number
) => {
  try {
    const response = await instance.post(
      `/cart/${customerId}/addToCart/${productId}/${quantity}`
    );
    if (response.status >= 200 && response.status < 300) {
      return response.data;
    } else {
      console.error("Unexpected status code:", response.status);
    }
  } catch (error) {
    throw error;
  }
};

export const removeCartItemByProductId = async (
  customerId: number,
  productId: number
) => {
  try {
    const response = await instance.delete(`/cart/${customerId}/${productId}`);
    if (response.status >= 200 && response.status < 300) {
      return response.data;
    } else {
      console.error("Unexpected status code:", response.status);
    }
  } catch (error) {
    throw error;
  }
};

export const updateCartProductQuantity = async (
  id: number,
  quantity: number
) => {
  try {
    const response = await instance.put(`/cart/${id}/${quantity}`);
    if (response.status >= 200 && response.status < 300) {
      return response.data;
    } else {
      console.error("Unexpected status code:", response.status);
    }
  } catch (error) {
    throw error;
  }
};
