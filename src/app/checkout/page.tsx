"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const CheckoutPage = () => {
  const router = useRouter();
  const [isPaying, setIsPaying] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState<
    "upi" | "card" | "bank" | null
  >(null);

  const handlePay = () => {
    if (!selectedMethod) return alert("Please select a payment method.");
    setIsPaying(true);

    // Simulate payment process
    setTimeout(() => {
      router.push("/success");
    }, 4000);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-4 py-10 bg-gray-50">
      <h1 className="text-2xl font-semibold mb-6">Checkout</h1>

      <div className="bg-white shadow-md rounded-md p-6 w-full max-w-md flex flex-col gap-4">
        {/* Order Summary */}
        <h2 className="text-lg font-semibold mb-2">Order Summary</h2>
        <div className="flex flex-col gap-4 border-b pb-4">
          <div className="flex justify-between items-center">
            <div>
              <p className="font-medium">Cyberpunk Hoodie</p>
              <p className="text-sm text-gray-500">Qty: 1</p>
            </div>
            <span>$49.00</span>
          </div>
          <div className="flex justify-between items-center">
            <div>
              <p className="font-medium">Neon Joggers</p>
              <p className="text-sm text-gray-500">Qty: 1</p>
            </div>
            <span>$50.00</span>
          </div>
        </div>

        {/* Total */}
        <div className="flex justify-between font-semibold text-lg mt-2">
          <span>Total:</span>
          <span>$99.00</span>
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
