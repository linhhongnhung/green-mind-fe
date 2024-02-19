import { getAdminByUsername, getCustomerByUsername, login } from "@/api/api";
import Link from "next/link";
import React, { ChangeEvent, useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/components/authentication/AuthContext";
import { useAdminAuth } from "@/components/authentication/AdminAuthContext";
import { toast } from "react-toastify";

interface InputFieldProps {
  name: string;
  label: string;
  type: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const InputField: React.FC<InputFieldProps> = ({
  name,
  label,
  type,
  value,
  onChange,
}) => {
  return (
    <label className="text-gray" htmlFor={label}>
      {label}
      <input
        className="md:w-[449px] h-16 rounded-[12px]
                      px-[18px] mt-2
                      xl:text-tiny
                      bg-zinc-100
                      text-black
                      focus:ring-2 focus:ring-content focus:outline-none transition
                      block
                      max-md:h-14 max-md:px-4 max-md:w-full
                      max-sm:h-12"
        type={type}
        id="label"
        name={name}
        value={value}
        onChange={onChange}
      />
    </label>
  );
};

interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  role: string;
}

const saveTokensToStorage = (accessToken: string, refreshToken: string) => {
  localStorage.setItem("accessToken", accessToken);
  localStorage.setItem("refreshToken", refreshToken);
};

export default function Login() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleLogin(formData.username, formData.password);
  };
  
  const handleLogin = async (username: string, password: string) => {
    try {
      const loginResponse = await login({ username: username, password: password });
      console.log(loginResponse)
      if (loginResponse.status === 200) {
        const loginData: LoginResponse = loginResponse.response.data[0];
        console.log(loginData)
        const { accessToken, refreshToken, role } = loginData;
        saveTokensToStorage(accessToken, refreshToken);
        if(role === "customer") {
          const customer = await getCustomerByUsername(username);
          customer.isLoggedIn = true;
          localStorage.setItem("user", JSON.stringify(customer));
          setUser(customer); // Cập nhật tothông tin người dùng trong context
          console.log(user)
          router.push("/");
        } else {
          const admin = await getAdminByUsername(username);
            admin.isLoggedIn = true;
            localStorage.setItem("admin", JSON.stringify(admin));
            setAdmin(admin);
            router.push("/admin")
        }
      } else {
        toast.error('Please check your login information again!', { autoClose: 3000, position: toast.POSITION.TOP_CENTER });
      }
    } catch (error) {
      toast.error('Please check your login information again!', { autoClose: 3000, position: toast.POSITION.TOP_CENTER });
        console.error("Error", error);
    }
  };

  const { setUser, user } = useAuth(); // Lấy setUser từ context
  const { setAdmin, admin } = useAdminAuth();

  return (
    <main className="bg-[url('../public/img/login_bg.png')] bg-center bg-cover">
      <section
        className="max-w-[1440px] mx-auto
                    flex flex-row  min-h-[820px] rounded-[16px]
                    max-md:px-3"
      >
        <form
          className="max-w-[1280px] min-w-[560px] py-20 my-auto mr-12 rounded-[16px] bg-white
                     flex flex-col items-center justify-center gap-6 ml-auto
                     max-md:px-12 max-md:mx-auto max-md:min-w-[196px] max-sm:px-10"
          onSubmit={handleSubmit}
        >
          <h1 className="text-base font-bold mb-8 max-md:text-[1.5rem] text-center">Welcome to GREENMIND!</h1>
          <div className="flex flex-col gap-2 max-md:w-full">
            <InputField
              name="username"
              label="Username"
              type="text"
              value={formData.username}
              onChange={handleFormChange}
            />
            <InputField
              name="password"
              label="Password"
              type="password"
              value={formData.password}
              onChange={handleFormChange}
            />
          </div>
          <button
            className="w-[449px] h-[64px] rounded-[8px]
                         bg-primary
                         text-tiny
                         relative
                         hover:brightness-[0.6] transition delay-100 duration-300
                         max-md:w-full max-md:h-14 max-sm:h-12"
          >
            Login
          </button>
          <Link href="/signup">
            <p
              className="underline underline-offset-1 text-gray text-sm
                         md:ml-[252px]
                         over:text-content transition"
            >
              You don&rsquo;st have an account?
            </p>
          </Link>
        </form>
      </section>
    </main>
  );
}
