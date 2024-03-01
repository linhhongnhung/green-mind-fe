import React from "react";

interface InputFieldProps {
  key: number;
  label: string;
  type: string;
}

const InputField: React.FC<InputFieldProps> = (props) => {
  const { label, type } = props;
  return (
    <React.Fragment>
      <label className="text-gray" htmlFor={label}>
        {label}
        <input
          className="
            w-[449px] h-16 rounded-[12px]
            px-[18px] mt-2
            xl:text-tiny
            bg-zinc-100
            focus:ring-2 focus:ring-content focus:outline-none transition
            block"
          type={type}
          id="label"
        />
      </label>
    </React.Fragment>
  );
};

export default InputField;
