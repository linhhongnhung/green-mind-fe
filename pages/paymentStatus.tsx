import { useEffect } from "react";
import { useRouter } from "next/router";
import { createOrderAfterPayment } from "@/api";
import { toast } from "react-toastify";

const PaymentStatus: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const params = queryParams.get("vnp_ResponseCode");
    handlePaymentSuccess(params);
  }, []);

  const handlePaymentSuccess = async (vnp_ResponseCode: any) => {
    let orderDataJSON = localStorage.getItem("orderData");
    let orderData = JSON.parse(orderDataJSON!);
    orderData.vnp_ResponseCode = vnp_ResponseCode;
    await createOrderAfterPayment(JSON.stringify(orderData));
    if (vnp_ResponseCode === "00") {
      toast.success("Order successfully!", {
        autoClose: 1000,
        position: toast.POSITION.TOP_CENTER,
      });
      router.push("/history");
    } else {
      toast.error("Order failed!", {
        autoClose: 1000,
        position: toast.POSITION.TOP_CENTER,
      });
      router.push("/cart");
    }
  };

  return (
    <main className="max-w-[1440px] mx-auto">
      <section className="max-w-[1280px] mx-24 my-12 flex flex-col items-center">
        <h2 className="font-bold text-base">
          Ready to pay for order with VNPAY?
        </h2>
        <img className="w-96" src="./img/vnpay.png" alt="vnpay image" />
      </section>
    </main>
  );
};

export default PaymentStatus;
