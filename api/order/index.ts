import { instance } from "../instance";

export const createOrder = async (orderData: any) => {
  try {
    const response = await instance.post("/order", orderData, {
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
    throw error;
  }
};

export const getOrdersByCustomerId = async (customerId: any) => {
  try {
    const response = await instance.post("/order/history", customerId, {
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
    throw error;
  }
};

export const getOrderById = async (orderId: any) => {
  try {
    const response = await instance.post("/order/orderInfo", orderId, {
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
    throw error;
  }
};

export const createOrderAfterPayment = async (orderData: any) => {
  try {
    const response = await instance.post("/payment/makeOrder", orderData, {
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
    throw error;
  }
};

export const generateVnpayUrl = async (data: any) => {
  try {
    const response = await instance.post("/payment", data, {
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
    throw error;
  }
};

export const getOrdersByDate = async (data: any) => {
  try {
    const response = await instance.post("/order/by-date", data, {
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
    throw error;
  }
};
