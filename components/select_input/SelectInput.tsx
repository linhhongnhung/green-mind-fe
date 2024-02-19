import React, { useState } from "react";

import Select from "react-select";


interface SelectInputProps {
  data: object[],
  onChange: any;
}

const SelectInput: React.FC<SelectInputProps> = (props) => {
  const { data, onChange } = props

  return (
    <Select
      className="basic-single max-sm:w-40"
      classNamePrefix="select"
      defaultValue={data[0]}
      options={data}
      onChange={onChange}
    />
  );
};

export default SelectInput;