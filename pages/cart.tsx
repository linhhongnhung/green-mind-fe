import { getCart, removeCartItemByProductId } from "@/api";
import { ProductItem } from "@/components";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useCartContext } from "@/components/context/CartContext";
import { toast } from "react-toastify";

interface CartItem {
  id: number;
  quantity: number;
  product: {
    id: number;
    name: string;
    description: string;
    price: number;
    quantity: number;
    image: string;
  };
}

const Cart: React.FC = () => {
  const router = useRouter();
  const { selectedProducts, clearSelectedProducts } = useCartContext();
  const { cartItems, setcartItems } = useCartContext();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const userFromLocalStorage = localStorage.getItem("user");
    if (userFromLocalStorage) {
      setUser(JSON.parse(userFromLocalStorage));
    } else {
      router.push("/login");
    }
  }, [router]);

  useEffect(() => {
    clearSelectedProducts();
  }, []);

  const fetchCartItems = async () => {
    try {
      if (user) {
        const response = await getCart(user.id);
        setcartItems(response.reverse());
      }
    } catch (error) {
      console.error("An error occurred while calling the API: ", error);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, [user]);

  const handleMakeOrder = () => {
    router.push({
      pathname: "/order",
      query: { selectedProducts: JSON.stringify(selectedProducts) },
    });
  };

  const handleDelete = async () => {
    try {
      if (user) {
        const removalPromises = selectedProducts.map((item) =>
          removeCartItemByProductId(user.id, item)
        );
        await Promise.all(removalPromises);
        fetchCartItems();
        toast.success("Update cart successfully!", {
          autoClose: 1000,
          position: toast.POSITION.TOP_CENTER,
        });
      }
    } catch (error) {
      toast.error("An error occurred. Please try again later!", {
        autoClose: 5000,
        position: toast.POSITION.TOP_CENTER,
      });
      console.error("An error occurred while deleting items: ", error);
    }
  };

  return (
    <main className="max-w-[1440px] min-h-[600px] mx-auto">
      <section className="max-w-[1280px] mx-24 my-12 max-md:mx-8">
        <h2 className="font-bold text-base mb-8 max-md:text-tiny">
          Let&rsquo;s place an order now!
        </h2>

        <div className="flex justify-end gap-8">
          <button className="hover:opacity-[0.6]" onClick={handleDelete}>
            <img className="w-8" src="./icon/remove.svg" alt="remove icon" />
          </button>
          <button
            className="
              w-[168px] h-[50px] rounded-[8px]
              bg-primary
              text-tiny
              relative
              hover:brightness-[0.6] transition delay-100 duration-300"
            onClick={handleMakeOrder}
          >
            Buy now
          </button>
        </div>

        {/* Cart item */}
        <div className="mx-12 max-md:mx-0 max-md:mt-8">
          {cartItems.map((item, index) => {
            return (
              <div key={index} className="flex">
                <ProductItem
                  belong="cart"
                  id={item.id}
                  productId={item.product.id}
                  image={item.product.image}
                  name={item.product.name}
                  price={item.product.price}
                  quantity={item.quantity}
                  inventory={item.product.quantity}
                  href={`/product/${item.product.id}`}
                />
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
};

export default Cart;
