"use client";

import { useState, useEffect } from "react";
import { getCookie, setCookie } from "cookies-next";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import Link from "next/link";

const COOKIE_CONSENT_KEY = "koorfameus-cookie-consent";

export function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Check if user has already made a choice
    const consent = getCookie(COOKIE_CONSENT_KEY);
    if (!consent) {
      // Small delay to prevent flash on page load
      const timer = setTimeout(() => setShowBanner(true), 500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    setCookie(COOKIE_CONSENT_KEY, "accepted", {
      maxAge: 60 * 60 * 24 * 365, // 1 year
      sameSite: "lax",
    });
    setShowBanner(false);
  };

  const handleDecline = () => {
    setCookie(COOKIE_CONSENT_KEY, "declined", {
      maxAge: 60 * 60 * 24 * 365, // 1 year
      sameSite: "lax",
    });
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 animate-in slide-in-from-bottom duration-300">
      <div className="container mx-auto">
        <div className="bg-white rounded-xl shadow-2xl border border-gray-100 p-4 md:p-6 max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <div className="flex-1">
              <h3 className="font-semibold text-text-primary mb-1">
                Cookies op deze website
              </h3>
              <p className="text-sm text-text-secondary">
                Wij gebruiken alleen functionele cookies die noodzakelijk zijn voor het goed functioneren van de website.
                Lees meer in ons{" "}
                <Link href="/privacy" className="text-purple hover:underline">
                  privacybeleid
                </Link>.
              </p>
            </div>
            <div className="flex gap-3 flex-shrink-0">
              <Button
                variant="outline"
                onClick={handleDecline}
                className="border-gray-200 text-text-secondary hover:bg-gray-50"
              >
                Weigeren
              </Button>
              <Button
                onClick={handleAccept}
                className="bg-purple hover:bg-purple-dark text-white"
              >
                Accepteren
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
