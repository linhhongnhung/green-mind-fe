import React from "react";
import {
  Unstable_NumberInput as NumberInput,
  NumberInputProps,
} from "@mui/base/Unstable_NumberInput";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";

const CustomNumberInput = React.forwardRef(function CustomNumberInput(
  props: NumberInputProps,
  ref: React.ForwardedRef<HTMLDivElement>
) {
  return (
    <NumberInput
      defaultValue={props.defaultValue}
      slotProps={{
        root: {
          className:
            "leading-snug text-slate-900 dark:text-slate-300 flex flex-row flex-nowrap justify-center items-center w-[148px]",
        },
        input: {
          className:
            "text-zinc-950 leading-snug text-md text-inherit bg-white border border-solid border-slate-300 rounded-[8px] my-0 mx-1 py-2.5 px-3 outline-0 min-w-0 w-16 text-center focus-visible:outline-0 hover:border-primary focus:border-primary focus:shadow-outline-purple focus-visible:outline-none max-md:w-8 max-md:mx-0 max-md:p-2 ",
        },
        incrementButton: {
          children: <AddIcon />,
          className:
            "order-1 text-md box-border leading-normal border-0 rounded-[8px] bg-transparent w-10 h-10 flex flex-row flex-nowrap justify-center items-center transition-all duration-[120ms] focus-visible:outline-0 hover:cursor-pointer hover:brightness-[0.2] max-md:w-8 max-md:h-8",
        },
        decrementButton: {
          children: <RemoveIcon />,
          className:
            "text-md box-border leading-normal border-0 rounded-[8px] bg-transparent w-10 h-10 flex flex-row flex-nowrap justify-center items-center transition-all duration-[120ms] focus-visible:outline-0 hover:cursor-pointer hover:brightness-[0.2] max-md:w-8 max-md:h-8",
        },
      }}
      {...props}
      ref={ref}
    />
  );
});

const QuantityInput = (props: any) => {
  return (
    <CustomNumberInput
      aria-label="Quantity Input"
      min={1}
      max={props.inventory}
      defaultValue={props.quantity}
      onChange={props.onChange}
    />
  );
};

export default QuantityInput;
