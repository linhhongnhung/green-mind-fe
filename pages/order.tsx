import { createOrder } from "@/api/api";
import { Button, ProductItem } from "@/components";
import { useCheckAuth } from "@/components/authentication/AuthContext";
import { useCartContext } from "@/components/context/CartContext";
import SelectInput from "@/components/select_input/SelectInput";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

export default function Order() {
  const router = useRouter();
  const user = useCheckAuth();
  const [selectedProductsState, setSelectedProductsState] = useState<number[]>(
    []
  );
  const [paymentMethod, setPaymentMethod] = useState(paymentMethods[0]);
  const { cartItems } = useCartContext();

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }

    const { selectedProducts } = router.query;
    const parsedSelectedProducts = Array.isArray(selectedProducts)
      ? selectedProducts[0]
      : JSON.parse(selectedProducts || "[]");
    setSelectedProductsState(parsedSelectedProducts);
  }, [router.query, user]);

  const orderProducts = cartItems.filter((item) =>
    selectedProductsState.includes(item.product.id)
  );
  // tính tổng tiền
  let total = 0;
  orderProducts.map((item) => (total += item.product.price * item.quantity));

  const handleMakeOrder = async () => {
    let products: Products[] = [];
      for (const item of orderProducts) {
        products.push({ productId: item.product.id, quantity: item.quantity });
      }
      const orderData = {
        customerId: user?.id,
        products: products,
        paymentMethod: paymentMethod.value,
      };
      const orderJSON = JSON.stringify(orderData);
    if (paymentMethod.value === "Cash") {
      await createOrder(orderJSON);
      toast.success('Order successfully!', { autoClose: 1000, position: toast.POSITION.TOP_CENTER });
      router.push("/history")
    } else {
      localStorage.setItem("orderData", orderJSON)
      console.log(paymentMethod.value)
      router.push({
        pathname: "/payment",
        query: { orderJSON: orderJSON, total: total },
      })
    }
  };

  const handlePaymentMethodChange = (selectedOption: any) => {
    setPaymentMethod(selectedOption);
  };

  // const qrCode = {
  //   bankName: "agribank",
  //   acccountNumber: "8309205094259",
  //   accountName: "LINH%20HONG%20NHUNG",
  //   amount: total,
  //   addInfo: `Customer%20with%20id${user?.id}%20paid`,
  // };

  return (
    <main className="max-w-[1440px] mx-auto">
      <section className="max-w-[1280px] mx-24 my-12 max-md:mx-16 max-sm:mx-6">
        <h2 className="font-bold text-base mb-8 max-md:text-tiny">Confirm your order:</h2>
        <div className="flex flex-col gap-2 md:ml-24 md:text-tiny">
          <p>
            <b>Name:</b> {user?.name}
          </p>
          <p>
            <b>Address:</b> {user?.address}
          </p>
          <p>
            <b>Phone number:</b> {user?.phoneNumber}
          </p>
          <p className="font-bold md:text-tiny mt-2 md:pl-12">Plants list:</p>
        </div>
        {/* Order item */}
        <div className="mx-48 max-md:mx-12">
          {orderProducts.map((orderProduct, index) => {
            return (
              <div className="flex" key={index}>
                <ProductItem
                  belong="order"
                  image={orderProduct.product.image}
                  name={orderProduct.product.name}
                  price={orderProduct.product.price}
                  quantity={orderProduct.quantity}
                  href={`/product/${orderProduct.product.id}`}
                />
              </div>
            );
          })}
        </div>
        <p className="md:text-tiny ml-auto md:w-[200px] mb-16 max-md:mb-8 max-md:mt-2">Total: <b>{total}</b></p>
        <div className="md:w-[400px] ml-auto">
          <p className="mb-2 font-bold ml-auto">Payment methods:</p>
          <SelectInput
            data={paymentMethods}
            onChange={handlePaymentMethodChange}
          />
        </div>
        {/* <div className="text-gray flex gap-2 ml-12 my-8">
          <p>Note:</p>
          <p>
            Please scan this QR code to pay or save the QR code and proceed to
            pay when ready! The order will be prepared once you have made
            payment. If you want to pay directly upon receipt, please change
            your payment method to "Cash".
          </p>
        </div> */}

        {/* <div className="w-[400px] mx-auto">
          <img
            src={`https://img.vietqr.io/image/${qrCode.bankName}-${qrCode.acccountNumber}-print.jpg?amount=${qrCode.amount}&addInfo=${qrCode.addInfo}&accountName=${qrCode.accountName}`}
          />
        </div> */}
        <div className="flex justify-end mt-8">
          <Button href="/order" text="Make Order" onClick={handleMakeOrder} />
        </div>
      </section>
    </main>
  );
}

const paymentMethods = [
  { value: "Cash", label: "Cash" },
  { value: "VNPAY", label: "VNPAY" },
];

interface Products {
  productId: number;
  quantity: number;
}
