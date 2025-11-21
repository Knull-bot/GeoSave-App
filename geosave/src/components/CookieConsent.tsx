"use client";

import { useSyncExternalStore } from "react";

const COOKIE_NAME = "cookie-consent";
const MAX_AGE = 60 * 60 * 24 * 30;

function getSnapshot(): boolean {
  if (typeof document === "undefined") return false;
  return document.cookie
    .split("; ")
    .some((row) => row.startsWith(COOKIE_NAME + "="));
}

function subscribe(onStoreChange: () => void): () => void {
  window.__cookieConsentCallback = onStoreChange;
  return () => {
    delete (window as any).__cookieConsentCallback;
  };
}

function setCookieConsent(value: "accepted" | "declined") {
  document.cookie = `${COOKIE_NAME}=${value}; path=/; max-age=${MAX_AGE}; SameSite=Lax`;

  if ((window as any).__cookieConsentCallback) {
    (window as any).__cookieConsentCallback();
  }
}

export default function CookieConsent() {
  const hasConsent = useSyncExternalStore(subscribe, getSnapshot, () => false);

  if (hasConsent) return null;

  const handleAccept = () => setCookieConsent("accepted");
  const handleDecline = () => setCookieConsent("declined");
  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        width: "100%",
        background: "#222",
        color: "#fff",
        padding: "1rem",
        textAlign: "center",
        zIndex: 1,
      }}
    >
      <span>
        Wir verwenden Cookies, um die Benutzererfahrung zu verbessern. Stimmen
        Sie der Verwendung von Cookies zu?
      </span>
      <button onClick={handleAccept} style={{ marginLeft: "1rem" }}>
        Accept
      </button>
      <button onClick={handleDecline} style={{ marginLeft: "1rem" }}>
        Aclaim
      </button>
    </div>
  );
}
