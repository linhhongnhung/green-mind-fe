import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";

interface Admin {
    id: number;
    position: string;
    user: {
      id: number;
      username: string;
      role: string;
    };
    isLoggedIn: boolean;
  }

interface AdminAuthContextType {
  admin: Admin | null;
  setAdmin: React.Dispatch<React.SetStateAction<Admin | null>>;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(
  undefined
);

export const AdminAuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [admin, setAdmin] = useState<Admin | null>(null);

  useEffect(() => {
    const storedAdmin = localStorage.getItem("admin");
    if (storedAdmin) {
      setAdmin(JSON.parse(storedAdmin));
    }
  }, []);
  return (
    <AdminAuthContext.Provider value={{ admin, setAdmin }}>
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error("useAdminAuth must be used within an AdmminAuthProvider");
  }
  return context;
};

export const useCheckAdminAuth = () => {
  const { admin } = useAdminAuth();
  return admin;
};
