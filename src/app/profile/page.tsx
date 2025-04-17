"use server";

import UpdateButton from "@/components/ui/UpdateButton";
import Link from "next/link";
import { format } from "timeago.js";

const ProfilePage = () => {
  // Dummy user info
  const user = {
    contactId: "abc123",
    profile: { nickname: "johndoe" },
    contact: {
      firstName: "John",
      lastName: "Doe",
      phones: ["+1234567890"],
    },
    loginEmail: "john.doe@example.com",
  };

  // Dummy orders
  const orders = [
    {
      _id: "ORDER1234567890",
      priceSummary: { subtotal: { amount: "5330" } },
      _createdDate: new Date().toISOString(),
      status: "Shipped",
    },
    {
      _id: "ORDER0987654321",
      priceSummary: { subtotal: { amount: "8375" } },
      _createdDate: new Date(Date.now() - 86400000 * 2).toISOString(), // 2 days ago
      status: "Processing",
    },
  ];

  return (
    <div className="flex flex-col md:flex-row gap-24 md:h-[calc(100vh-180px)] items-center px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
      <div className="w-full md:w-1/2">
        <h1 className="text-2xl">Profile</h1>
        <form className="mt-12 flex flex-col gap-4">
          <input type="text" hidden name="id" value={user.contactId} />
          <label className="text-sm text-gray-700">Username</label>
          <input
            type="text"
            name="username"
            placeholder={user.profile.nickname}
            className="ring-1 ring-gray-300 rounded-md p-2 max-w-96"
          />
          <label className="text-sm text-gray-700">First Name</label>
          <input
            type="text"
            name="firstName"
            placeholder={user.contact.firstName}
            className="ring-1 ring-gray-300 rounded-md p-2 max-w-96"
          />
          <label className="text-sm text-gray-700">Surname</label>
          <input
            type="text"
            name="lastName"
            placeholder={user.contact.lastName}
            className="ring-1 ring-gray-300 rounded-md p-2 max-w-96"
          />
          <label className="text-sm text-gray-700">Phone</label>
          <input
            type="text"
            name="phone"
            placeholder={user.contact.phones[0]}
            className="ring-1 ring-gray-300 rounded-md p-2 max-w-96"
          />
          <label className="text-sm text-gray-700">E-mail</label>
          <input
            type="email"
            name="email"
            placeholder={user.loginEmail}
            className="ring-1 ring-gray-300 rounded-md p-2 max-w-96"
          />
          <UpdateButton />
        </form>
      </div>
      <div className="w-full md:w-1/2">
        <h1 className="text-2xl">Orders</h1>
        <div className="mt-12 flex flex-col">
          {orders.map((order) => (
            <Link
              href={`/orders/${order._id}`}
              key={order._id}
              className="flex justify-between px-2 py-6 rounded-md hover:bg-green-50 even:bg-slate-100"
            >
              <span className="w-1/4">{order._id.substring(0, 10)}...</span>
              <span className="w-1/4">
                Rs. {order.priceSummary.subtotal.amount}
              </span>
              <span className="w-1/4">{format(order._createdDate)}</span>
              <span className="w-1/4">{order.status}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
