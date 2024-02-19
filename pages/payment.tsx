import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useCheckAuth } from "@/components/authentication/AuthContext";
import { generateVnpayUrl } from "@/api/api";

const Payment = () => {
  const router = useRouter();
  const user = useCheckAuth();

  const { orderJSON, total } = router.query;

  const initiatePayment = async () => {
    const getUrlData = {
      customerId: user?.id,
      amount: Number(total),
    };
    const getUrlDataJSON = JSON.stringify(getUrlData);
    const vnpayUrl = await generateVnpayUrl(getUrlDataJSON);
    console.log(vnpayUrl);
    window.location.href = vnpayUrl;
  };

  return (
    <main className="max-w-[1440px] mx-auto">
      <section className="max-w-[1280px] mx-24 my-12 flex flex-col items-center max-md:mx-16">
        <h2 className="font-bold text-base max-md:text-tiny text-center">Ready to pay for your order with VNPAY?</h2>
        <img className="w-96" src="./img/vnpay.png" alt="vnpay image" />
        <button
          className="w-[168px] h-[50px] rounded-[8px]
                                           bg-[#005AA9] text-white
                                           text-tiny
                                           relative
                                           hover:opacity-[0.8] transition delay-100 duration-300"
          onClick={initiatePayment}
        >
          Pay with VNPAY
        </button>
      </section>
    </main>
  );
};

export default Payment;
