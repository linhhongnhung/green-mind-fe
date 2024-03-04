import { getOrdersByCustomerId } from "@/api";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Slide from "@/components/animations/Slide";
import { ProductItem } from "@/components";
import { utcToZonedTime } from "date-fns-tz";

const Histoty: React.FC = () => {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    const userFromLocalStorage = localStorage.getItem("user");
    if (userFromLocalStorage) {
      setUser(JSON.parse(userFromLocalStorage));
    } else {
      router.push("/login");
    }
  }, [router]);

  const fetchOrderItems = async () => {
    try {
      if (user) {
        const userIdJSON = JSON.stringify({ customerId: user.id });
        const response = await getOrdersByCustomerId(userIdJSON);
        setOrders(response.orders.reverse());
        console.log(response);
      }
    } catch (error) {
      console.error("An error occurred while calling the API: ", error);
    }
  };

  useEffect(() => {
    fetchOrderItems();
  }, [user]);

  return (
    <main className="max-w-[1440px] min-h-[600px] mx-auto">
      <section className="max-w-[1280px] mx-24 my-12 max-md:mx-6">
        <h2 className="font-bold text-base mb-8 max-sm:text-tiny">
          Your order history
        </h2>

        {/* Orders */}
        <div className="mx-12 flex flex-col max-sm:mx-auto">
          {orders.map((order, index) => {
            return (
              <OrderItem
                key={index}
                id={order.id}
                name={order.name}
                address={order.address}
                phoneNumber={order.phoneNumber}
                total={order.total}
                date={utcToZonedTime(order.date, "Asia/Ho_Chi_Minh")}
                paymentMethod={order.paymentMethod}
                paymentStatus={order.paymentStatus}
                shipmentStatus={order.shipmentStatus}
                orderProducts={order.orderProducts}
              />
            );
          })}
        </div>
      </section>
    </main>
  );
};

interface OrderItemProps {
  id: number;
  name: string;
  address: string;
  phoneNumber: string;
  total: number;
  date: Date;
  paymentMethod: string;
  paymentStatus: string;
  shipmentStatus: string;
  orderProducts: any[];
}

const OrderItem: React.FC<OrderItemProps> = (props) => {
  let {
    id,
    name,
    address,
    phoneNumber,
    total,
    date,
    paymentMethod,
    paymentStatus,
    shipmentStatus,
    orderProducts,
  } = props;
  const [viewDetail, setviewDetail] = useState<boolean>(false);
  const handleViewDetail = () => {
    setviewDetail(!viewDetail);
  };
  if (viewDetail === false)
    return (
      <React.Fragment>
        <div
          className="flex justify-between cursor-pointer"
          onClick={handleViewDetail}
        >
          <div className="flex">
            <img className="max-sm:hidden" src="./icon/Order.svg" />
            <div className="mx-8 max-sm:mx-auto">
              <p className="font-bold sm:text-tiny">ID {id}</p>
              <p className="text-content">Total: {total} đ</p>
              <p className="text-gray">Date: {date.toString()}</p>
            </div>
          </div>
          <img src="./icon/DropDown.svg" />
        </div>
        <div className="bg-[#F0F0F0] h-[1px] my-4"></div>
      </React.Fragment>
    );
  else {
    return (
      <React.Fragment>
        <div
          className="flex justify-between cursor-pointer"
          onClick={handleViewDetail}
        >
          <div className="flex">
            <img src="./icon/Order.svg" />
            <div className="mx-8 max-sm:mx-3">
              <p className="font-bold sm:text-tiny">ID {id}</p>
              <p className="text-content">Total: {total} đ</p>
              <p className="text-gray max-sm:leading-4">
                Date: {date.toString()}
              </p>
            </div>
          </div>
          <img src="./icon/DropUp.svg" />
        </div>
        <Slide key={0} index={0} direction="down">
          <div className="my-4">
            <div className="flex flex-col sm:gap-2 mx-6 sm:text-tiny max-sm:mx-2">
              <p>
                <b>Name:</b> {name}
              </p>
              <p>
                <b>Address:</b> {address}
              </p>
              <p>
                <b>Phone number:</b> {phoneNumber}
              </p>
              <p className="font-bold sm:text-tiny mt-2">Plants list:</p>

              {/* Order item */}
              <div className="mx-12">
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
                        id={0}
                        productId={0}
                        inventory={0}
                      />
                    </div>
                  );
                })}
              </div>
              <p>
                <b>Total:</b> {total}
              </p>
              <div className="flex md:gap-24 max-md:flex-col">
                <p>
                  <b>Payment method:</b> {paymentMethod}
                </p>
                <p>
                  <b>Payment status:</b> {paymentStatus}
                </p>
              </div>
              <div className="flex md:gap-24 max-md:flex-col">
                <p>
                  <b className="max-sm:leading-4">Date:</b> {date.toString()}
                </p>
                <p>
                  <b>Shippment status:</b> {shipmentStatus}
                </p>
              </div>
            </div>
          </div>
        </Slide>
        <div className="bg-[#F0F0F0] h-[1px] my-4"></div>
      </React.Fragment>
    );
  }
};

export default Histoty;
