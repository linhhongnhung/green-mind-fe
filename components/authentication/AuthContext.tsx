import { useRouter } from "next/router";
import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";

interface User {
  id: number,
  name: string
  address: string,
  phoneNumber: string,
  email: string,
  user: {
      id: number,
      username: string,
      role: string
  }
  isLoggedIn: boolean;
}

interface AuthContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  // Thử lấy dữ liệu user từ Local Storage khi component được tạo
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const useCheckAuth = () => {
  const { user } = useAuth();
  return user;
};

