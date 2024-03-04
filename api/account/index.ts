import { instance } from "../instance";

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

export const signup = async (userData: Signup) => {
  try {
    const response = await instance.post("/signup", userData);
    if (response.status >= 200 && response.status < 300) {
      return response.data;
    } else {
      console.error("Unexpected status code:", response.status);
    }
  } catch (error) {
    throw error;
  }
};

export const login = async (loginData: Login) => {
  try {
    const response = await instance.post("/login", loginData);
    if (response.status >= 200 && response.status < 300) {
      return response.data;
    } else {
      console.error("Unexpected status code:", response.status);
    }
  } catch (error) {
    throw error;
  }
};

export const getCustomerByUsername = async (username: string) => {
  try {
    const response = await instance.get(`/customer/${username}`);
    if (response.status >= 200 && response.status < 300) {
      return response.data;
    } else {
      console.error("Unexpected status code:", response.status);
    }
  } catch (error) {
    throw error;
  }
};

export const getAdminByUsername = async (username: string) => {
  try {
    const response = await instance.get(`/admin/${username}`);
    if (response.status >= 200 && response.status < 300) {
      return response.data;
    } else {
      console.error("Unexpected status code:", response.status);
    }
  } catch (error) {
    throw error;
  }
};

export const updateCustomerWithNewUsername = async (updateData: any) => {
  try {
    const response = await instance.post(
      "/customer/updateWithNewUsername",
      updateData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
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

export const updateCustomer = async (updateData: any) => {
  try {
    const response = await instance.post("/customer/update", updateData, {
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

export const getAllUsernames = async () => {
  try {
    const response = await instance.get("/user");
    if (response.status >= 200 && response.status < 300) {
      return response.data;
    } else {
      console.error("Unexpected status code:", response.status);
    }
  } catch (error) {
    throw error;
  }
};
