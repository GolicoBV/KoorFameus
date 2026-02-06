"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { AlertCircle, CheckCircle, Loader2 } from "lucide-react";
import Link from "next/link";

interface FormState {
  status: "idle" | "loading" | "success" | "error";
  message: string;
}

export function ContactForm() {
  const [formState, setFormState] = useState<FormState>({
    status: "idle",
    message: "",
  });
  const [gdprConsent, setGdprConsent] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!gdprConsent) {
      setFormState({
        status: "error",
        message: "Je moet akkoord gaan met het privacybeleid om dit formulier te versturen.",
      });
      return;
    }

    setFormState({ status: "loading", message: "" });

    const formData = new FormData(event.currentTarget);
    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      subject: formData.get("subject") as string,
      message: formData.get("message") as string,
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Er ging iets mis bij het versturen.");
      }

      setFormState({
        status: "success",
        message: "Bedankt voor je bericht! We nemen zo snel mogelijk contact met je op.",
      });

      // Reset form
      (event.target as HTMLFormElement).reset();
      setGdprConsent(false);
    } catch {
      setFormState({
        status: "error",
        message: "Er ging iets mis. Probeer het later opnieuw of mail ons direct.",
      });
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">Naam *</Label>
          <Input
            id="name"
            name="name"
            type="text"
            placeholder="Je naam"
            required
            disabled={formState.status === "loading"}
            className="border-gray-200 focus:border-coral focus:ring-coral"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">E-mail *</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="je@email.be"
            required
            disabled={formState.status === "loading"}
            className="border-gray-200 focus:border-coral focus:ring-coral"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="subject">Onderwerp *</Label>
        <Input
          id="subject"
          name="subject"
          type="text"
          placeholder="Waar gaat je bericht over?"
          required
          disabled={formState.status === "loading"}
          className="border-gray-200 focus:border-coral focus:ring-coral"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">Bericht *</Label>
        <Textarea
          id="message"
          name="message"
          placeholder="Stel je vraag of vertel ons wat je wilt weten..."
          rows={6}
          required
          disabled={formState.status === "loading"}
          className="border-gray-200 focus:border-coral focus:ring-coral resize-none"
        />
      </div>

      {/* GDPR Consent */}
      <div className="flex items-start gap-3">
        <Checkbox
          id="gdpr"
          checked={gdprConsent}
          onCheckedChange={(checked) => setGdprConsent(checked === true)}
          disabled={formState.status === "loading"}
          className="mt-1 data-[state=checked]:bg-coral data-[state=checked]:border-coral"
        />
        <Label htmlFor="gdpr" className="text-sm text-text-secondary leading-relaxed cursor-pointer">
          Ik ga akkoord met het{" "}
          <Link href="/privacy" className="text-coral hover:underline">
            privacybeleid
          </Link>{" "}
          en geef toestemming voor de verwerking van mijn gegevens om mijn vraag te beantwoorden. *
        </Label>
      </div>

      {/* Status Messages */}
      {formState.status === "success" && (
        <div className="flex items-start gap-3 bg-green-50 text-green-800 p-4 rounded-lg">
          <CheckCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
          <p>{formState.message}</p>
        </div>
      )}

      {formState.status === "error" && (
        <div className="flex items-start gap-3 bg-red-50 text-red-800 p-4 rounded-lg">
          <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
          <p>{formState.message}</p>
        </div>
      )}

      <Button
        type="submit"
        disabled={formState.status === "loading"}
        className="w-full md:w-auto bg-coral hover:bg-coral-dark text-white px-8 py-6 text-lg rounded-xl shadow-md hover:shadow-lg transition-all duration-200"
      >
        {formState.status === "loading" ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            Versturen...
          </>
        ) : (
          "Verstuur bericht"
        )}
      </Button>

      <p className="text-sm text-text-muted">
        * Verplichte velden. Je gegevens worden alleen gebruikt om je vraag te beantwoorden.
      </p>
    </form>
  );
}
