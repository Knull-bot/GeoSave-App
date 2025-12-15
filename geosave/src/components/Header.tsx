"use client";

import logo from "@/src/img/bird.png";
import Image from "next/image";
import Link from "next/link";
import classes from "./Header.module.css";
import { LogoutButton } from "./Button";

export function HeaderAdmin() {
  return (
    <div className={classes["dashboard-initial-loader"]}>
      <div>
        <Link href={"/"}>
          <Image alt="logo" src={logo}></Image>
        </Link>
      </div>
      <div>
        <h1>GeoSave</h1>
      </div>
      <div className={classes["buttons"]}>
        <Link href="/all-tasks" className={classes["btn"]}>
          All Tasks
        </Link>
        <LogoutButton />
      </div>
    </div>
  );
}

export function HeaderUser() {
  return (
    <div className={classes["dashboard-initial-loader"]}>
      <div>
        <Link href={"/"}>
          <Image alt="logo" src={logo}></Image>
        </Link>
      </div>
      <div>
        <h1>GeoSave</h1>
      </div>
      <div className={classes["buttons"]}>
        <Link href="/savebutton" className={classes["btn"]}>
          Save Button
        </Link>
        <LogoutButton />
      </div>
    </div>
  );
}

export function MainHeader() {
  return (
    <div className={classes["dashboard-initial-loader"]}>
      <div>
        <Link href={"/"}>
          <Image alt="logo" src={logo}></Image>
        </Link>
      </div>
      <div>
        <h1>GeoSave</h1>
      </div>
      <div className={classes["buttons"]}>
        <Link href="/sign-in" className={classes["btn"]}>
          Sign In
        </Link>
        <Link href="/sign-up" className={classes["btn"]}>
          Sign Up
        </Link>
      </div>
    </div>
  );
}
