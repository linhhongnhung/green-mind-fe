import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import React, { ChangeEvent } from "react";
import { signup } from "@/api";

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
        className="
          w-[449px] h-16 rounded-[12px]
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

const Signup: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    address: "",
    username: "",
    password: "",
  });

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const router = useRouter();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await signup(formData);

      if (response.status === 201) {
        toast.success("Sign up successfully!", { autoClose: 1000 });
        router.push("/login");
      } else {
        toast.error("Sign up fail!", { autoClose: 1000 });
      }
    } catch (error) {
      console.error("Error", error);
    }
  };

  return (
    <main className="bg-[url('../public/img/login_bg.png')] bg-center bg-cover py-8">
      <section
        className="
          max-w-[1440px] mx-auto
          flex flex-row min-h-[820px] rounded-[16px]"
      >
        <form
          className="
            max-w-[1280px] min-w-[560px] my-auto mr-12 py-12 rounded-[16px] bg-white
            flex flex-col items-center justify-center gap-6 ml-auto
            max-md:px-12 max-md:mx-auto max-sm:min-w-[340px] max-sm:px-10 max-md:min-w-[500px]"
          onSubmit={handleSignup}
        >
          <h1 className="text-base font-bold mb-8 text-center max-md:text-[1.5rem]">
            Creat an account
          </h1>
          <div className="flex flex-col gap-4 max-md:w-full max-md:gap-2">
            <InputField
              name="name"
              label="Name"
              type="text"
              value={formData.name}
              onChange={handleFormChange}
            />
            <InputField
              name="email"
              label="Email"
              type="email"
              value={formData.email}
              onChange={handleFormChange}
            />
            <InputField
              name="phoneNumber"
              label="Phone number"
              type="text"
              value={formData.phoneNumber}
              onChange={handleFormChange}
            />
            <InputField
              name="address"
              label="Address"
              type="text"
              value={formData.address}
              onChange={handleFormChange}
            />
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
            type="submit"
            className="
              w-[449px] h-[64px] rounded-[8px]
              bg-primary
              text-tiny
              relative
              hover:brightness-[0.6] transition delay-100 duration-300
              max-md:w-full max-md:h-14 max-sm:h-12"
          >
            Sign up
          </button>
          <Link href="/login">
            <p
              className="
                underline underline-offset-1 text-gray text-sm
                md:ml-[214px]
                hover:text-content transition"
            >
              Do you already have an account?
            </p>
          </Link>
        </form>
      </section>
    </main>
  );
};

export default Signup;
