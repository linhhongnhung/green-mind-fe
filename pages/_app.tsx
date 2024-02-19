// These styles apply to every route in the application
import "@/styles/globals.css";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import type { AppProps } from "next/app";
import React from "react";
import { Header, Footer } from "@/components";
import AdminPage from "./admin";
import dynamic from "next/dynamic";
import { AuthProvider } from "@/components/authentication/AuthContext";
import { CartProvider } from "@/components/context/CartContext";
import { AdminAuthProvider } from "@/components/authentication/AdminAuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const poppins = Poppins({
  weight: ["400", "500", "700", "800"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GREENMIND",
  description: "Dev @LinhHongNhung",
};

const AdminApp = dynamic(() => import("@/pages/admin"), {
  ssr: false,
});

export default function App({ Component, pageProps }: AppProps) {
  if (Component === AdminPage)
    return (
      <AuthProvider>
        <ToastContainer />
          <AdminAuthProvider>
            <div className={poppins.className}>
              <AdminApp />
            </div>
        </AdminAuthProvider>
      </AuthProvider>
    );
  else
    return (
      <AuthProvider>
        <ToastContainer />
          <AdminAuthProvider>
            <CartProvider>
              <div className={poppins.className}>
                <Header />
                <Component {...pageProps} />
                <Footer />
              </div>
            </CartProvider>
        </AdminAuthProvider>
      </AuthProvider>
    );
}
