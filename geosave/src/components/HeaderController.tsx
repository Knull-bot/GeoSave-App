"use client";
import { useState, useEffect } from "react";
import { HeaderAdmin, HeaderUser, MainHeader } from "./Header";

export const HeaderController = () => {
  const [role, setRole] = useState<"admin" | "user" | null>(null);

  useEffect(() => {
    fetch("/api/auth/userRole", { credentials: "include" })
      .then((res) => res.json())
      .then((data) => setRole(data.role || null))
      .catch(() => setRole(null));
  }, []);

  if (role === "admin") return <HeaderAdmin />;
  if (role === "user") return <HeaderUser />;
  return <MainHeader />;
};
