"use client";

import { useState } from "react";
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

type Status =
  | { kind: "idle" }
  | { kind: "loading" }
  | { kind: "success"; message: string }
  | { kind: "error"; message: string };

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setStatus({ kind: "error", message: "Please enter a valid email address." });
      return;
    }

    setStatus({ kind: "loading" });
    // 👉 Replace this with your own backend call
    await new Promise((r) => setTimeout(r, 900));
    setStatus({ kind: "success", message: "You're subscribed! Check your inbox." });
    setEmail("");
  };

  return (
    <section className="px-6 pb-20 sm:pb-28">
      <div
        className="relative mx-auto max-w-4xl overflow-hidden rounded-3xl px-6 py-16 text-center shadow-[0_18px_40px_-20px_rgba(0,0,0,0.18)] sm:px-12 sm:py-20"
        style={{
          background:
            "linear-gradient(135deg, #fbeee2 0%, #f3ede2 50%, #faf7f2 100%)",
        }}
      >
        <div
          aria-hidden
          className="absolute -top-20 -right-20 h-64 w-64 rounded-full blur-3xl"
          style={{ background: "rgba(184,98,58,0.15)" }}
        />
        <div
          aria-hidden
          className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full blur-3xl"
          style={{ background: "rgba(184,98,58,0.10)" }}
        />

        <div className="relative">
          <h2 className="text-3xl font-medium text-neutral-900 sm:text-4xl lg:text-5xl">
            Stay updated with the latest blogs
          </h2>
          <p className="mx-auto mt-4 max-w-md text-neutral-500">
            One thoughtful email each week. No spam, no noise — just good writing and blogs.
          </p>

          <form
            onSubmit={handleSubmit}
            className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row"
            aria-describedby="newsletter-status"
          >
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (status.kind !== "idle" && status.kind !== "loading") {
                  setStatus({ kind: "idle" });
                }
              }}
              disabled={status.kind === "loading"}
              aria-invalid={status.kind === "error"}
              aria-label="Email address"
              className="h-12 flex-1 rounded-full border border-[#ebe4d8] bg-white px-5 text-base text-neutral-900 placeholder:text-neutral-400 shadow-[0_2px_8px_rgba(0,0,0,0.04)] outline-none focus-visible:ring-2 focus-visible:ring-[#b8623a]"
            />
            <Button
              type="submit"
              variant="default"
              disabled={status.kind === "loading"}
              className=" h-12 text-white bg-[#fa66ff] rounded-4xl px-7 shadow-[0_12px_40px_-12px_rgba(184,98,58,0.45)] transition-all hover:bg-primary hover:-translate-y-0.5 hover:cursor-pointer disabled:opacity-70"
            >
              {status.kind === "loading" ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Subscribing
                </>
              ) : (
                "Subscribe"
              )}
            </Button>
          </form>

          <div
            id="newsletter-status"
            role="status"
            aria-live="polite"
            className="mx-auto mt-5 min-h-[1.5rem] max-w-md"
          >
            {status.kind === "success" && (
              <div className="animate-fade-up inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-neutral-900 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
                <CheckCircle2 className="h-4 w-4 text-[#b8623a]" />
                {status.message}
              </div>
            )}
            {status.kind === "error" && (
              <div className="animate-fade-up inline-flex items-center gap-2 rounded-full border border-red-300 bg-red-50 px-4 py-2 text-sm font-medium text-red-700">
                <AlertCircle className="h-4 w-4" />
                {status.message}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
