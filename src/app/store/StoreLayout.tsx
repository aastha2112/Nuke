import Sidebar from "@/components/layout/Sidebar";
import { StoreProvider } from "@/context/StoreContext";
import React from "react";

export default function StoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <StoreProvider>
      <div className="flex ">
        {/* Sidebar on the left */}
        <Sidebar />

        {/* Main content area */}
        <div className="flex-grow p-20">{children}</div>
      </div>
    </StoreProvider>
  );
}
