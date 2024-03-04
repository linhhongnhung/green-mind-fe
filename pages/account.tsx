import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth, useCheckAuth } from "@/components/authentication/AuthContext";
import { toast } from "react-toastify";

import {
  getAllUsernames,
  updateCustomer,
  updateCustomerWithNewUsername,
} from "@/api";

const Account: React.FC = () => {
  const inputList = [
    {
      label: "Username",
      type: "text",
    },
    {
      label: "Name",
      type: "text",
    },
    {
      label: "Email",
      type: "email",
    },
    {
      label: "Phonenumber",
      type: "text",
    },
    {
      label: "Address",
      type: "text",
    },
  ];

  const router = useRouter();
  const { setUser, user } = useAuth();

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [router, user]);

  const [formData, setFormData] = useState({
    username: user?.user.username || "",
    name: user?.name || "",
    email: user?.email || "",
    phonenumber: user?.phoneNumber || "",
    address: user?.address || "",
  });

  const initialUsername = user?.user.username;

  if (user) {
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value,
      });
    };

    const handleUpdate = async () => {
      try {
        if (formData.username === initialUsername) {
          const response = await updateCustomer(JSON.stringify(formData));
          console.log(response);
          const customer = {
            id: user?.id,
            name: formData.name,
            address: formData.address,
            phoneNumber: formData.phonenumber,
            email: formData.email,
            user: {
              id: user?.user.id,
              username: initialUsername,
              role: user?.user.role,
            },
            isLoggedIn: true,
          };
          setUser(customer);
          toast.success("Update successfully!", {
            autoClose: 1000,
            position: toast.POSITION.TOP_CENTER,
          });
        } else {
          const allUsernames = await getAllUsernames();
          console.log(allUsernames);
          if (Array.isArray(allUsernames)) {
            const usernameExists = allUsernames.some(
              (item) => item === formData.username
            );

            if (usernameExists) {
              toast.error(
                "Username already exists. Please change to another value!",
                { autoClose: 5000, position: toast.POSITION.TOP_CENTER }
              );
            } else {
              const updateData = {
                oldUsername: initialUsername,
                newUsername: formData.username,
                name: formData.name,
                email: formData.email,
                phonenumber: formData.phonenumber,
                address: formData.address,
              };
              const response = await updateCustomerWithNewUsername(
                JSON.stringify(updateData)
              );
              console.log(response);
              const customer = {
                id: user.id,
                name: formData.name,
                address: formData.address,
                phoneNumber: formData.phonenumber,
                email: formData.email,
                user: {
                  id: user.user.id,
                  username: formData.username,
                  role: user.user.role,
                },
                isLoggedIn: true,
              };
              setUser(customer);
              toast.success("Update successfully!", {
                autoClose: 1000,
                position: toast.POSITION.TOP_CENTER,
              });
            }
          }
        }
      } catch (error) {
        toast.error("An error occurred. Please try again later!", {
          autoClose: 5000,
          position: toast.POSITION.TOP_CENTER,
        });
        console.error("Error ", error);
      }
    };

    const handleLogout = () => {
      setUser(null);
      localStorage.clear();
      router.push("/login");
    };

    return (
      <main className="bg-[url('../public/img/bg-account.png')] bg-cover py-6">
        <section className="max-w-[1440px] mx-auto my-12">
          <div className="mx-24 bg-white rounded-[32px] py-14 max-md:mx-4 max-sm:mx-2">
            <h2 className="font-bold text-2xl text-center">
              Account Information
            </h2>
            <div className="flex flex-row justify-center px-24 pt-12 max-xl:flex-col max-xl:items-center max-sm:pt-4">
              <div className="xl:mr-48">
                <img
                  className="w-48 max-md:w-20"
                  src="./img/user.svg"
                  alt="avatar"
                />
              </div>
              <div className="flex flex-col gap-4 max-md:gap-2">
                {inputList.map((item, index) => {
                  let value = "";
                  if (index === 0) value = formData.username;
                  else if (index === 1) value = formData.name;
                  else if (index === 2) value = formData.email;
                  else if (index === 3) value = formData.phonenumber;
                  else value = formData.address;
                  return (
                    <InputField
                      key={index}
                      label={item.label}
                      type={item.type}
                      value={value}
                      onChange={handleInputChange}
                    />
                  );
                })}
                <div className="mt-8 flex gap-8 max-xl:justify-center max-md:gap-4 max-sm:gap-2">
                  <button
                    className="
                      w-[168px] h-[50px] rounded-[8px]
                      bg-primary
                      md:text-tiny
                      relative
                      hover:brightness-[0.6] transition delay-100 duration-300
                      max-md:w-[132px] max-md:h-[44px]"
                    onClick={handleUpdate}
                  >
                    Update
                  </button>
                  <button
                    className="
                      w-[168px] h-[50px] rounded-[8px]
                      bg-primary
                      md:text-tiny
                      relative
                      hover:brightness-[0.6] transition delay-100 duration-300
                      max-md:w-[132px] max-md:h-[44px]"
                    onClick={handleLogout}
                  >
                    Log out
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    );
  }
};

interface InputFieldProps {
  key: number;
  label: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField: React.FC<InputFieldProps> = (props) => {
  const { label, type, value, onChange } = props;
  return (
    <React.Fragment>
      <label className="text-gray max-sm:mx-auto" htmlFor={label}>
        {label}
        <input
          className="
            w-[449px] h-16 rounded-[12px]
            px-[18px] mt-2
            xl:text-tiny
            bg-zinc-100 text-content
            focus:ring-2 focus:ring-content focus:outline-none transition
            block
            max-sm:max-w-[316px] max-sm:mx-auto max-md:h-12"
          type={type}
          value={value}
          name={label.toLowerCase()}
          onChange={onChange}
        />
      </label>
    </React.Fragment>
  );
};

export default Account;
