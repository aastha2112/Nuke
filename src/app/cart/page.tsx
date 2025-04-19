"use client";

import Image from "next/image";
import { useCartStore } from "@/hooks/useCartStore";
import { media as wixMedia } from "@wix/sdk";
import { useWixClient } from "@/hooks/useWixClient";
import { useRouter } from "next/navigation";

const Cart = ({ handleModal }) => {
  const router = useRouter();
  const wixClient = useWixClient();
  const { cart, isLoading, removeItem } = useCartStore();

  const handleCheckout = async () => {
    try {
      console.log(cart, "cart here");
      router.push("/checkout");
      handleModal(true);
    } catch (err) {
      console.error("Checkout failed:", err);
    }
  };

  return (
    <div className="px-6 py-4 md:max-w-2/3 lg:max-w-1/2 mx-auto">
      {!cart.lineItems ? (
        <div className="">Cart is Empty</div>
      ) : (
        <>
          <h2 className="text-xl my-2 mb-8">Shopping Cart</h2>
          <div className="flex flex-col gap-8 ">
            {/* ITEM */}
            {cart.lineItems.map((item) => (
              <div className="flex gap-4" key={item._id}>
                {item.image && (
                  <Image
                    src={
                      wixMedia.getScaledToFillImageUrl(
                        item.image,
                        72,
                        96,
                        {}
                      ) || "/woman.png"
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
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 md:gap-8">
                      <h3 className="font-semibold text-sm md:text-lg">
                        {item.productName?.original}
                      </h3>
                      <div className="p-1 bg-gray-50 rounded-sm flex items-center gap-2  text-sm md:text-lg">
                        {item.quantity && item.quantity > 1 && (
                          <div className="text-xs text-green-500">
                            {item.quantity} x{" "}
                          </div>
                        )}
                        Rs. {item.price?.amount}
                      </div>
                    </div>
                    {/* DESC */}
                    <div className="text-xs my-2 text-gray-500">
                      {item.availability?.status}
                    </div>
                  </div>
                  {/* BOTTOM */}
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Qty. {item.quantity}</span>
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
          </div>
          {/* BOTTOM */}
          <div className="">
            <div className="flex items-center justify-between font-semibold mt-8">
              <span className="">Subtotal</span>
              <span className="">Rs. {+cart?.subtotal?.amount}</span>
            </div>
            <p className="text-gray-500 text-sm mt-2 mb-4">
              Shipping and taxes calculated at checkout.
            </p>
            <div className="flex justify-between text-sm">
              <button
                className="rounded-md py-3 px-4 bg-black text-white disabled:cursor-not-allowed disabled:opacity-75"
                disabled={isLoading}
                onClick={handleCheckout}
              >
                Checkout
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
