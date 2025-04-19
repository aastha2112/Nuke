"use client";
import { CiMenuKebab } from "react-icons/ci";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useWixClient } from "@/hooks/useWixClient";
import Cookies from "js-cookie";
import { useCartStore } from "@/hooks/useCartStore";
import { usePathname, useRouter } from "next/navigation";

const Menu = () => {
  const [open, setOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const wixClient = useWixClient();
  const isLoggedIn = wixClient.auth.loggedIn();
  const handleProfile = () => {
    if (!isLoggedIn) {
      router.push("/login");
    } else {
      setIsProfileOpen((prev) => !prev);
    }
  };

  const handleLogout = async () => {
    setIsLoading(true);
    Cookies.remove("refreshToken");
    const { logoutUrl } = await wixClient.auth.logout(window.location.href);
    setIsLoading(false);
    setIsProfileOpen(false);
    router.push(logoutUrl);
  };
  const { cart, counter, getCart } = useCartStore();

  useEffect(() => {
    getCart(wixClient);
  }, [wixClient, getCart]);

  return (
    <div className="">
      <button
        className="cursor-pointer"
        onClick={() => setOpen((prev) => !prev)}
      >
        <CiMenuKebab />
      </button>
      {/* <Image src="/menu.png" alt="" width={28} height={28} /> */}
      {open && (
        <div className="absolute bg-black text-white left-0 top-20 w-full h-[calc(100vh-80px)] flex flex-col items-center justify-center gap-8 text-xl  z-10">
          <Link href="/" onClick={() => setOpen((prev) => !prev)}>
            Home
          </Link>
          <Link href="/" onClick={() => setOpen((prev) => !prev)}>
            Shop
          </Link>
          <Link href="/" onClick={() => setOpen((prev) => !prev)}>
            Deals
          </Link>
          <Link href="/" onClick={() => setOpen((prev) => !prev)}>
            About
          </Link>
          <Link href="/" onClick={() => setOpen((prev) => !prev)}>
            Contact
          </Link>
          {/* <Link href="/">Login</Link> */}
          {isLoggedIn ? (
            <Link href={"/"} onClick={handleLogout}>
              {" "}
              {isLoading ? "Logging out" : "Logout"}
            </Link>
          ) : (
            <Link href={"/login"}>Login</Link>
          )}
          <Link href="/cart" onClick={() => setOpen((prev) => !prev)}>
            Cart <span>({counter})</span>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Menu;
