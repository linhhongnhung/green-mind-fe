import axios from "axios";

const instance = axios.create({
  baseURL: 'https://green-mind-be-production.up.railway.app',
});

interface Products {
  id: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
  categories: number[];
}

interface Category {
  id: number;
  name: string;
  description: string;
}

interface Signup {
  name: string;
  email: string;
  phoneNumber: string;
  address: string;
  username: string;
  password: string;
}

interface Login {
  username: string;
  password: string;
}

interface Customer {
  name: string;
  email: string;
  phoneNumber: string;
  address: string;
}

interface OrderProducts {
  productId: number;
  quantity: number;
}

interface Order {
  customerId: number | undefined;
  products: OrderProducts[];
  paymentMethod: string;
}

interface UpdateCustomer {
  username: string;
  name: string;
  email: string;
  phonenumber: string;
  address: string;
}


interface UpdateCustomerWithNewUsername {
  oldUsername: string;
  newUsername: string;
  name: string;
  email: string;
  phonenumber: string;
  address: string;
}


export const createProduct = async (productData: Products) => {
  try {
    const response = await instance.post("/products", productData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getCategoriesByIds = async (ids: number[]) => {
  try {
    const response = await instance.get("/categories/getby/ids", {
      params: { ids: ids.join(',') }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAllCategories = async () => {
  try {
    const response = await instance.get("/categories");
    return response.data;
  } catch (error) {
    throw error;
  }
};



export const signup = async (userData: Signup) => {
  try {
    const response = await instance.post("/signup", userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const login = async (loginData: Login) => {
  try {
    const response = await instance.post("/login", loginData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getCustomerByUsername = async (username: string) => {
  try {
    const response = await instance.get(`/customer/${username}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAdminByUsername = async (username: string) => {
  try {
    const response = await instance.get(`/admin/${username}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateCustomerWithNewUsername = async (updateData: any) => {
  try {
    const response = await instance.post("/customer/updateWithNewUsername", updateData, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    return response.data;
  } catch (error) {{
    throw error;
  }}
};

export const updateCustomer = async (updateData: any) => {
  try {
    const response = await instance.post("/customer/update", updateData, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAllProducts = async () =>  {
  try {
    const response = await instance.get("/products")
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAllProductsWithCategories = async () =>  {
  try {
    const response = await instance.get("products/get/categories")
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getProductById = async (id: number) =>  {
  try { 
    const response = await instance.get(`/products/${id}`)
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getProductImageUrl = async (id: number) =>  {
  try { 
    const response = await instance.get(`/products/image/${id}`)
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getCart = async (customerId: number) =>  {
  try {
    const response = await instance.get(`/cart/${customerId}`)
    return response.data;
  } catch (error) {
    throw error;
  }
};


export const addToCart = async (customerId: number, productId: number, quantity: number) =>  {
  try {
    const response = await instance.post(`/cart/${customerId}/addToCart/${productId}/${quantity}`)
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const removeCartItemByProductId = async (customerId: number, productId: number) =>  {
  try {
    const response = await instance.delete(`/cart/${customerId}/${productId}`)
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateCartProductQuantity = async (id: number, quantity: number) =>  {
  try {
    const response = await instance.put(`/cart/${id}/${quantity}`)
    return response.data;
  } catch (error) {
    throw error;
  }
}

export const createOrder = async (orderData: any) =>  {
  try {
    const response = await instance.post("/order", orderData, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    return response.data;
  } catch (error) {
    throw error;
  }
}

export const getOrdersByCustomerId = async (customerId: any) =>  {
  try {
    const response = await instance.post("/order/history", customerId, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    return response.data;
  } catch (error) {
    throw error;
  }
}

export const getOrderById = async (orderId: any) =>  {
  try {
    const response = await instance.post("/order/orderInfo", orderId, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    return response.data;
  } catch (error) {
    throw error;
  }
}

export const searchProduct = async (key: string) => {
  try {
    const response = await instance.post("/products/search", key, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    return response.data;
  } catch (error) {{
    throw error;
  }}
}

export const getAllUsernames = async () => {
  try {
    const response = await instance.get("/user");
    return response.data;
  } catch (error) {
    throw error;
  }
}

export const createOrderAfterPayment = async (orderData: any) =>  {
  try {
    const response = await instance.post("/payment/makeOrder", orderData, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    return response.data;
  } catch (error) {
    throw error;
  }
}

export const generateVnpayUrl = async (data: any) =>  {
  try {
    const response = await instance.post("/payment", data, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    return response.data;
  } catch (error) {
    throw error;
  }
}

export const getOrdersByDate = async (data: any) =>  {
  try {
    const response = await instance.post("/order/by-date", data, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    return response.data;
  } catch (error) {
    throw error;
  }
}