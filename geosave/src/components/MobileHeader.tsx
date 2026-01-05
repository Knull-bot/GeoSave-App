"use client";

import { useState } from "react";
import Link from "next/link";
import classes from "./MobileHeader.module.css";
import { LogoutButton } from "./Button";

type MobileHeaderProps = {
  variant: "user" | "guest";
};

export default function MobileHeader({ variant }: MobileHeaderProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        className={classes.burger}
        onClick={() => setOpen(true)}
        aria-label="Open menu"
      >
        ☰
      </button>

      <div
        className={`${classes.overlay} ${open ? classes.open : ""}`}
        onClick={() => setOpen(false)}
      >
        <nav
          className={`${classes.drawer} ${open ? classes.open : ""}`}
          onClick={(e) => e.stopPropagation()}
        >
          <button className={classes.close} onClick={() => setOpen(false)}>
            ✕
          </button>

          {variant === "user" && (
            <Link
              href="/savebutton"
              className={classes["btn"]}
              onClick={() => setOpen(false)}
            >
              Save Button
            </Link>
          )}

          {variant === "guest" && (
            <>
              <Link
                className={classes["btn"]}
                href="/sign-in"
                onClick={() => setOpen(false)}
              >
                Sign In
              </Link>
              <Link
                className={classes["btn"]}
                href="/sign-up"
                onClick={() => setOpen(false)}
              >
                Sign Up
              </Link>
            </>
          )}

          {variant !== "guest" && <LogoutButton />}
        </nav>
      </div>
    </>
  );
}
