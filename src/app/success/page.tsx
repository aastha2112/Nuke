"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Confetti from "react-confetti";

const SuccessPage = () => {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/orders/1");
    }, 5000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="flex flex-col gap-4 sm:gap-6 items-center justify-center h-[calc(100vh-180px)] px-4 text-center">
      <Confetti width={2000} height={1000} />
      <h1 className="text-4xl sm:text-5xl md:text-6xl text-green-700 font-bold">
        Successful
      </h1>
      <h2 className="text-base sm:text-lg md:text-xl font-medium">
        We sent the invoice to your e-mail
      </h2>
      <h3 className="text-sm sm:text-base">
        You are being redirected to the orders page...
      </h3>
    </div>
  );
};

export default SuccessPage;
