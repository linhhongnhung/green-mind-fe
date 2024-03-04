import {
  List,
  Datagrid,
  TextField,
  ListProps,
  Edit,
  SimpleForm,
  RadioButtonGroupInput,
} from "react-admin";
import React, { useState, useEffect } from "react";
import { getOrderById } from "@/api";
import Link from "next/link";

interface Orders {
  id: number;
  customerId: number;
  customerName: string;
  address: string;
  phoneNumber: string;
  total: number;
  paymentMethod: string;
  paymentStatus: string;
  shipmentStatus: string;
}

interface OrdersProps extends ListProps {
  data: Orders[];
}

interface Order {
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

export const OrdersList: React.FC<OrdersProps> = (props) => (
  <List {...props}>
    <Datagrid rowClick="edit" size="medium">
      <TextField source="id" />
      <TextField source="name" />
      <TextField source="address" />
      <TextField source="phoneNumber" />
      <TextField source="date" />
      <TextField source="total" />
      <TextField source="paymentMethod" />
      <TextField source="paymentStatus" />
      <TextField source="shipmentStatus" />
    </Datagrid>
  </List>
);

export const UpdateOrder: React.FC<OrdersProps> = (props) => {
  const [order, setOrder] = useState<Order>();

  function extractIdFromUrl() {
    const currentPath = window.location.href; // Lấy đường dẫn hiện tại
    const matches = currentPath.match(/\/order\/(\d+)$/); // Tìm số cuối cùng trong đường dẫn

    // Kiểm tra nếu có matches và nếu có ít nhất một capture group
    if (matches && matches.length > 1) {
      return matches[1]; // Trả về phần tử cuối cùng (ID)
    }

    return null; // Trả về null nếu không tìm thấy ID
  }
  const id = extractIdFromUrl();

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const orderId = {
          orderId: id,
        };
        const orderData: Order = await getOrderById(JSON.stringify(orderId));
        setOrder(orderData);
        console.log(order);
      } catch (error) {
        console.error("Error fetching order:", error);
      }
    };

    if (id) {
      fetchOrder();
    }
  }, [id]);

  return (
    <React.Fragment>
      <Edit {...props}>
        <SimpleForm>
          <span className="font-bold">Order detail:</span>
          <TextField source="id" disabled />
          <TextField source="name" />
          <TextField source="address" />
          <TextField source="phoneNumber" />
          <TextField source="paymentMethod" />
          <TextField source="total" />
          <TextField source="date" />
          <RadioButtonGroupInput
            source="paymentStatus"
            choices={[
              { id: "Unpaid", name: "Unpaid" },
              { id: "Paid", name: "Paid" },
            ]}
          />
          <RadioButtonGroupInput
            source="shipmentStatus"
            choices={[
              { id: "Pending", name: "Pending" },
              { id: "Delivered", name: "Delivered" },
            ]}
          />
        </SimpleForm>
      </Edit>
      <div className="m-12">
        {order?.orderProducts.map((orderProduct, index) => {
          return (
            <div className="flex" key={index}>
              <Link
                href={`/product/${orderProduct.product.id}`}
                className="flex gap-12 my-2"
              >
                <img
                  className="w-24"
                  src={orderProduct.product.image}
                  alt="product image"
                />
                <div>
                  <p className="font-bold">{orderProduct.product.name}</p>
                  <p>{orderProduct.product.price}</p>
                  <p className="text-gray">
                    Quantity: x {orderProduct.quantity}
                  </p>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </React.Fragment>
  );
};
