"use client";

import { useRouter } from "next/navigation";
import classes from "./page.module.css";

export default function SignIn() {
  const router = useRouter();
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const login = formData.get("login")?.toString() || "";
    const password = formData.get("password")?.toString() || "";

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ login, password }),
      credentials: "include",
    });

    const data = await res.json();

    if (res.ok) {
      router.push("/logged-in");
      router.refresh();
    } else {
      console.log(data.error);
    }
  }

  return (
    <form className={classes.container} onSubmit={handleSubmit}>
      <label htmlFor="login">Login</label>
      <input type="text" id="login" name="login" />
      <label htmlFor="password">Password</label>
      <input type="password" id="password" name="password" />
      <button type="submit">Login</button>
    </form>
  );
}
