import { addToCart, getProductById } from "@/api/api";
import { Button, QuantityInput } from "@/components";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Unstable_NumberInput as NumberInput } from '@mui/base';
import { useCheckAuth } from "@/components/authentication/AuthContext";
import { toast } from "react-toastify";

const Product: React.FC<ProductProps> = (props) => {
  const router = useRouter();
  const { id } = router.query; // Lấy id từ URL
  const user = useCheckAuth();

  const [product, setProduct] = useState<Plant>();

  useEffect(() => {
    if (id) {
      const productId = Array.isArray(id) ? parseInt(id[0], 10) : parseInt(id, 10);
  
      // Kiểm tra xem productId có phải là một số (number) hợp lệ hay không
      if (!isNaN(productId)) {
        getProductById(productId)
          .then((response) => {
              setProduct(response);
          })
          .catch((error) => {
            console.error("An error occurred while calling the API: ", error);
          });
      }
    }
  }, [id]);

  const [quantity, setQuantity] = useState<number>(1)
  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = parseInt(event.target.value, 10);
    if (!isNaN(newQuantity)) {
      setQuantity(newQuantity);
    }
  }

  const handleAddToCart = () =>
  {
    if (!user) {
      router.push("/login");
    }
    else {
      if(id)
      {
        const productId = Array.isArray(id) ? parseInt(id[0], 10) : parseInt(id, 10);
        const response = addToCart(user.id, productId, quantity);
        toast.success('Add to cart successfully!', { autoClose: 1000, position: toast.POSITION.BOTTOM_CENTER});
      }
    }
  }
  
  return (
    <main className="max-w-[1440px] mx-auto">
      <section
        className="max-w-[1280px] mx-24 my-12
                   flex flex-row items-center
                   max-lg:flex-col max-lg:mx-8 max-sm:mx-2"
      >
        <div className="w-[1010px] max-sm:mx-4 max-lg:w-auto py-auto">
          <img src={product?.image} alt="product image" />
        </div>
        <div className="ml-16 max-lg:mx-4">
          <div className="max-lg:mt-6 max-lg:min-h-[100px] mb-16">
            <p className="font-bold text-base max-sm:text-tiny">{product?.name}</p>
            <p className="text-base my-6 max-lg:text-tiny max-lg:my-2">{product?.price} đ</p>
            <p className="text-content">{product?.description}</p>
          </div>
          <p className="mb-8 max-lg:mt-6 max-sm:mb-4">Available: {product?.quantity}</p>
          <QuantityInput quantity={1} onChange={handleQuantityChange}/>
          <div className="mt-8 max-sm:mt-4">
            <Button href={`/product/${id}`} text="Add to cart" onClick={handleAddToCart}/>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Product;

interface ProductProps {
  image: string;
  name: string;
  description: string;
  price: number;
}

interface Plant {
  id: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
  image: string;
}