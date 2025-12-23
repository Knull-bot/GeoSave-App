"use client";

import logo from "@/src/img/bird.png";
import Image from "next/image";
import Link from "next/link";
import classes from "./Header.module.css";
import { LogoutButton } from "./Button";
import { usePathname } from "next/navigation";

export function HeaderAdmin() {
  return (
    <header className={classes["dashboard-initial-loader"]}>
      <div className={classes.left}>
        <Link href={"/"}>
          <Image alt="logo" src={logo}></Image>
        </Link>
      </div>
      <div className={classes.center}>
        <Link href={"/"}>
          <h1>GeoSave</h1>
        </Link>
      </div>
      <nav className={classes.right}>
        <Link href="/all-tasks" className={classes["btn"]}>
          All Tasks
        </Link>
        <LogoutButton />
      </nav>
    </header>
  );
}

export function HeaderUser() {
  return (
    <header className={classes["dashboard-initial-loader"]}>
      <div className={classes.left}>
        <Link href={"/"}>
          <Image alt="logo" src={logo}></Image>
        </Link>
      </div>
      <div className={classes.center}>
        <Link href={"/"}>
          <h1>GeoSave</h1>
        </Link>
      </div>
      <nav className={classes.right}>
        <Link href="/savebutton" className={classes["btn"]}>
          Save Button
        </Link>
        <LogoutButton />
      </nav>
    </header>
  );
}

export function MainHeader() {
  const pathname = usePathname();

  const isSigning = pathname === "/sign-in";
  const isSigningUp = pathname === "/sign-up";
  return (
    <header className={classes["dashboard-initial-loader"]}>
      <div className={classes.left}>
        <Link href={"/"}>
          <Image alt="logo" src={logo}></Image>
        </Link>
      </div>
      <div className={classes.center}>
        <Link href={"/"}>
          <h1>GeoSave</h1>
        </Link>
      </div>
      <nav className={classes.right}>
        <Link
          href="/sign-in"
          className={classes["btn"]}
          style={{ display: isSigning ? "none" : "block" }}
        >
          Sign In
        </Link>
        <Link
          href="/sign-up"
          className={classes["btn"]}
          style={{ display: isSigningUp ? "none" : "block" }}
        >
          Sign Up
        </Link>
      </nav>
    </header>
  );
}
