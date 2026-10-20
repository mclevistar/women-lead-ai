"use client";

import { openCookieSettings } from "@/components/cookie-banner";

export default function CookieSettingsLink() {
  return (
    <button
      type="button"
      onClick={openCookieSettings}
      className="text-sm text-muted-foreground hover:text-primary transition-colors"
    >
      Cookie Settings
    </button>
  );
}
