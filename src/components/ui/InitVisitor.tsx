"use client";

import { useEffect } from "react";

const InitVisitor = () => {
  useEffect(() => {
    const refreshToken = document.cookie.includes("refreshToken");

    if (!refreshToken) {
      fetch("/api/auth/init");
    }
  }, []);

  return null;
};

export default InitVisitor;
