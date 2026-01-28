"use client";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { HeaderAdmin, HeaderUser, MainHeader } from "./Header";

export const HeaderController = () => {
  const [role, setRole] = useState<"admin" | "user" | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    fetch("/api/auth/userRole", { credentials: "include" })
      .then((res) => res.json())
      .then((data) => setRole(data.role || null))
      .catch(() => setRole(null));
  }, []);

  if (pathname === "/sign-in" || pathname === "/sign-up") {
    return <MainHeader />;
  }
  if (role === "admin") return <HeaderAdmin />;
  if (role === "user") return <HeaderUser />;
  return <MainHeader />;
};
