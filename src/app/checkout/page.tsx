"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { media as wixMedia } from "@wix/sdk";

import { useCartStore } from "@/hooks/useCartStore";
import { useWixClient } from "@/hooks/useWixClient";
import Image from "next/image";

const CheckoutPage = () => {
  const router = useRouter();
  const [isPaying, setIsPaying] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState<
    "upi" | "card" | "bank" | null
  >(null);
  const wixClient = useWixClient();
  const isLoggedIn = wixClient.auth.loggedIn();
  console.log(isLoggedIn, "logged in");
  const { cart, isLoading, removeItem } = useCartStore();

  useEffect(() => {
    if (!isLoggedIn) {
      alert("Please login to continue.");
      router.push("/login");
    }
  }, [isLoggedIn]);

  const handlePay = () => {
    if (!selectedMethod) return alert("Please select a payment method.");
    setIsPaying(true);

    // Simulate payment process
    setTimeout(() => {
      router.push("/success");
    }, 4000);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-4 py-6 bg-gray-50">
      <h1 className="text-2xl font-semibold mb-6">Checkout</h1>

      <div className="bg-white shadow-md rounded-md p-6 w-full md:max-w-2/3 lg:max-w-1/2 flex flex-col gap-6">
        {/* Order Summary */}
        <h2 className="text-lg font-semibold mb-2">Order Summary</h2>

        {cart.lineItems?.map((item) => (
          <div className="flex gap-4 shadow-xs p-1" key={item._id}>
            {item.image && (
              <Image
                src={
                  wixMedia.getScaledToFillImageUrl(item.image, 72, 96, {}) ||
                  "/woman.png"
                }
                alt=""
                width={72}
                height={96}
                className="object-cover rounded-md"
              />
            )}
            <div className="flex flex-col justify-between w-full">
              {/* TOP */}
              <div className="">
                {/* TITLE */}
                <div className="flex md:flex-row flex-col md:items-center justify-between gap-2 md:gap-8">
                  <h3 className="font-semibold">
                    {item.productName?.original}
                  </h3>
                  <div className="p-1 bg-gray-50 rounded-sm flex items-center gap-2">
                    {item.quantity && item.quantity > 1 && (
                      <div className="text-xs text-green-500">
                        {item.quantity} x{" "}
                      </div>
                    )}
                    Rs. {item.price?.amount}
                  </div>
                </div>
                {/* DESC */}
                {/* <div className="text-sm text-gray-500 md:text-md py-1 ">
                  {item.availability?.status}
                </div> */}
              </div>
              {/* BOTTOM */}
              <div className="flex justify-between text-sm py-2">
                <span className="text-gray-500 ">Qty. {item.quantity}</span>
                <span
                  className="text-blue-500"
                  style={{ cursor: isLoading ? "not-allowed" : "pointer" }}
                  onClick={() => removeItem(wixClient, item._id!)}
                >
                  Remove
                </span>
              </div>
            </div>
          </div>
        ))}
        {/* stop */}

        {/* Total */}
        <div className="flex justify-between  text-md mt-2">
          <span> Delivery charges:</span>
          <span> Rs. 70</span>
        </div>
        <div className="flex justify-between bg-gray-200 px-3 py-2 font-semibold text-lg mt-2">
          <span>Total:</span>
          <span className="">Rs. {+cart?.subtotal?.amount + 70}</span>{" "}
        </div>

        {/* Payment Methods */}
        <div className="mt-6">
          <h3 className="text-base font-semibold mb-2">
            Select Payment Method
          </h3>
          <div className="flex flex-col gap-3">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="payment"
                value="upi"
                checked={selectedMethod === "upi"}
                onChange={() => setSelectedMethod("upi")}
              />
              <span>Pay using UPI</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="payment"
                value="card"
                checked={selectedMethod === "card"}
                onChange={() => setSelectedMethod("card")}
              />
              <span>Credit/Debit Card</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="payment"
                value="bank"
                checked={selectedMethod === "bank"}
                onChange={() => setSelectedMethod("bank")}
              />
              <span>Bank Transfer</span>
            </label>
          </div>
        </div>

        {/* Pay Button */}
        <button
          className={`w-full mt-6 py-3 rounded-md text-white font-medium ${
            isPaying
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-black hover:bg-gray-800"
          }`}
          disabled={isPaying}
          onClick={handlePay}
        >
          {isPaying
            ? "Processing..."
            : selectedMethod
            ? `Pay with ${selectedMethod.toUpperCase()}`
            : "Pay Now"}
        </button>
      </div>
    </div>
  );
};

export default CheckoutPage;
