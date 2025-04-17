"use client";

import Link from "next/link";
import { useCartStore } from "@/hooks/useCartStore";

const OrderPage = () => {
  const { cart } = useCartStore();

  // Dummy data
  const order = {
    _id: "ORD-123456",
    billingInfo: {
      contactDetails: {
        firstName: "John",
        lastName: "Doe",
      },
      address: {
        addressLine1: "123 Cyber Street",
        city: "Neo Tokyo",
      },
    },
    buyerInfo: {
      email: "john.doe@example.com",
    },
    priceSummary: {
      subtotal: {
        amount: "99.99",
      },
    },
    paymentStatus: "Paid",
    status: "Shipped",
  };

  return (
    <div className="flex flex-col min-h-[calc(100vh-180px)] items-center justify-center bg-gray-100 px-4 py-10">
      <div className="shadow-lg bg-white rounded-lg px-8 py-6 w-full max-w-2xl">
        <h1 className="text-2xl font-semibold text-gray-800">Order Details</h1>
        <div className="mt-8 flex flex-col gap-4 text-gray-700">
          <div>
            <span className="font-medium">Order ID: </span>
            <span>{order._id}</span>
          </div>
          <div>
            <span className="font-medium">Receiver Name: </span>
            <span>
              {order.billingInfo.contactDetails.firstName}{" "}
              {order.billingInfo.contactDetails.lastName}
            </span>
          </div>
          <div>
            <span className="font-medium">Receiver Email: </span>
            <span>{order.buyerInfo.email}</span>
          </div>
          <div>
            <span className="font-medium">Price: </span>
            <span>
              Rs. {cart?.subtotal?.amount || order.priceSummary.subtotal.amount}
            </span>
          </div>
          <div>
            <span className="font-medium">Payment Status: </span>
            <span>{order.paymentStatus}</span>
          </div>
          <div>
            <span className="font-medium">Order Status: </span>
            <span>{order.status}</span>
          </div>
          <div>
            <span className="font-medium">Delivery Address: </span>
            <span>
              {order.billingInfo.address.addressLine1},{" "}
              {order.billingInfo.address.city}
            </span>
          </div>
        </div>
        {/* Back to Home button */}
        <div className="mt-8">
          <Link
            href="/"
            className="flex justify-center items-center w-1/3 bg-lama text-white px-4 py-2 rounded hover:bg-gray-700 transition duration-200"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
      <Link
        href="/"
        className="underline mt-6 text-blue-600 hover:text-blue-800"
      >
        Have a problem? Contact us
      </Link>
    </div>
  );
};

export default OrderPage;
