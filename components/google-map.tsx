"use client";

import { useState, useEffect } from "react";
import { getCookie } from "cookies-next";
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";

interface GoogleMapProps {
  address?: string;
  embedUrl?: string;
  title?: string;
  className?: string;
}

const COOKIE_CONSENT_KEY = "koorfameus-cookie-consent";

// Default location: Landen, Belgium
const DEFAULT_EMBED_URL =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d25289.77!2d5.05!3d50.75!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c13f0a0a0a0a0a%3A0x0!2sLanden%2C%20Belgium!5e0!3m2!1snl!2sbe!4v1706900000000!5m2!1snl!2sbe";

export function GoogleMap({
  address = "Landen, België",
  embedUrl = DEFAULT_EMBED_URL,
  title = "Locatie",
  className = "",
}: GoogleMapProps) {
  const [hasConsent, setHasConsent] = useState<boolean | null>(null);
  const [showMap, setShowMap] = useState(false);

  useEffect(() => {
    const consent = getCookie(COOKIE_CONSENT_KEY);
    setHasConsent(consent === "accepted");
  }, []);

  // Still loading consent status
  if (hasConsent === null) {
    return (
      <div className={`bg-gray-100 rounded-xl flex items-center justify-center min-h-[300px] ${className}`}>
        <div className="animate-pulse text-text-muted">Laden...</div>
      </div>
    );
  }

  // User has declined cookies or hasn't given consent yet
  if (!hasConsent && !showMap) {
    return (
      <div className={`bg-gray-100 rounded-xl p-6 flex flex-col items-center justify-center min-h-[300px] ${className}`}>
        <MapPin className="h-12 w-12 text-coral/50 mb-4" />
        <h3 className="font-semibold text-text-primary mb-2">{title}</h3>
        <p className="text-text-secondary text-center mb-4 max-w-sm">
          {address}
        </p>
        <p className="text-sm text-text-muted text-center mb-4 max-w-sm">
          Om de kaart te tonen gebruiken we Google Maps.
          Dit vereist toestemming voor externe content.
        </p>
        <Button
          onClick={() => setShowMap(true)}
          variant="outline"
          className="border-coral text-coral hover:bg-coral hover:text-white"
        >
          Toon kaart
        </Button>
      </div>
    );
  }

  // Show the map
  return (
    <div className={`rounded-xl overflow-hidden ${className}`}>
      <iframe
        src={embedUrl}
        width="100%"
        height="300"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title={title}
        className="w-full"
      />
    </div>
  );
}
