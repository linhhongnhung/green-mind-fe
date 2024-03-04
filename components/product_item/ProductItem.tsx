import React, { useState } from "react";
import Link from "next/link";
import { QuantityInput } from "..";
import { updateCartProductQuantity } from "@/api";
import { useCartContext } from "../context/CartContext";

interface ProductItemProps {
  belong: string;
  id: number;
  productId: number;
  image: string;
  name: string;
  price: number;
  quantity: number;
  inventory: number;
  href: string;
}

const ProductItem: React.FC<ProductItemProps> = (props) => {
  let { belong, id, productId, image, name, price, quantity, inventory, href } =
    props;

  const [isChecked, setIsChecked] = useState<boolean>(false);

  const { selectedProducts, setSelectedProducts } = useCartContext();

  const handleCheckboxChange = () => {
    setIsChecked((prevChecked) => !prevChecked);
    setSelectedProducts((prevSelected) => {
      if (!isChecked) {
        return [...prevSelected, productId];
      } else {
        return prevSelected.filter((id) => id !== productId);
      }
    });
  };

  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantityValue = parseInt(event.target.value, 10);
    if (!isNaN(newQuantityValue)) {
      updateCartProductQuantity(id, newQuantityValue);
    }
  };

  console.log(selectedProducts);

  if (belong === "cart")
    return (
      <label className="flex gap-14 w-full max-md:gap-4">
        <input
          type="checkbox"
          checked={isChecked}
          onChange={handleCheckboxChange}
          className="w-6"
        />
        <div className="flex justify-between py-4 w-full">
          <Link href={href} className="flex">
            <img className="w-24" src={image} alt="product image" />
            <div className="mx-8 max-md:mx-4">
              <p className="font-bold text-tiny max-md:text-[1rem]">{name}</p>
              <p>{price}</p>
            </div>
          </Link>
          <QuantityInput
            quantity={quantity}
            onChange={handleQuantityChange}
            max={inventory}
          />
        </div>
      </label>
    );
  else
    return (
      <Link href={href} className="flex gap-12 my-2 max-md:gap-4">
        <img className="w-24 max-md:w-16" src={image} alt="product image" />
        <div>
          <p className="font-bold">{name}</p>
          <p>{price}</p>
          <p className="text-gray">Quantity: x {quantity}</p>
        </div>
      </Link>
    );
};

export default ProductItem;
