"use client";

import { useState, useEffect } from "react";
import classes from "./CookieConsent.module.css";

const COOKIE_NAME = "cookie-consent";

export default function CookieConsent() {
  const [hasConsent, setHasConsent] = useState<boolean | null>(null);

  useEffect(() => {
    const cookie = document.cookie
      .split("; ")
      .find((row) => row.startsWith(COOKIE_NAME + "="));
    setTimeout(() => {
      setHasConsent(cookie ? true : false);
    }, 0);
  }, []);

  const setCookieConsent = (value: "accepted" | "declined") => {
    const maxAge = value === "accepted" ? 60 * 60 * 24 * 30 : 60 * 60 * 24;

    document.cookie = `${COOKIE_NAME}=${value}; path=/; max-age=${maxAge}; SameSite=Lax`;
    setHasConsent(true);
  };

  if (hasConsent === null || hasConsent) return null;

  return (
    <div className={classes.cookieBanner}>
      <span className={classes.text}>
        Wir verwenden Cookies, um die Benutzererfahrung zu verbessern. Stimmen
        Sie der Verwendung von Cookies zu?
      </span>
      <div className={classes.buttons}>
        <button
          onClick={() => setCookieConsent("accepted")}
          className={classes.accept}
        >
          Akzeptieren
        </button>
        <button
          onClick={() => setCookieConsent("declined")}
          className={classes.decline}
        >
          Ablehnen
        </button>
      </div>
    </div>
  );
}
