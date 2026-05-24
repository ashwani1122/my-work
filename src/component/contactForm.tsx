"use client";

import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import {
  Send,
  Loader2,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

export default function ContactForm() {
  const form = useRef<HTMLFormElement | null>(null);

  const [loading, setLoading] = useState(false);

  const [status, setStatus] = useState<
    null | "success" | "error"
  >(null);

  const [errorMessage, setErrorMessage] =
    useState<string | null>(null);

  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.current) return;

    setLoading(true);
    setStatus(null);
    setErrorMessage(null);

    emailjs
      .sendForm(
        "service_lz2t0d8",
        "template_rs1y17a",
        form.current,
        {
          publicKey: "nedFjalZ23r9TMb6Z",
        }
      )
      .then(
        () => {
          setLoading(false);
          setStatus("success");
          form.current?.reset();
        },
        (error) => {
          setLoading(false);
          setStatus("error");

          setErrorMessage(
            error?.text ??
              "Something went wrong. Please try again."
          );
        }
      );
  };

  return (
    <form
      ref={form}
      onSubmit={sendEmail}
      aria-live="polite"
      className="
        relative
        overflow-hidden
        rounded-[32px]
        border
        border-white/10
        bg-white/[0.03]
        p-6
        md:p-8
        backdrop-blur-2xl
      "
    >
      {/* Glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-500/5 via-transparent to-cyan-500/5" />

      <div className="relative z-10">
        {/* Header */}
        <div>
          <div
            className="
              inline-flex
              items-center
              rounded-full
              border
              border-fuchsia-500/20
              bg-fuchsia-500/10
              px-4
              py-1
              text-sm
              text-fuchsia-300
            "
          >
            Contact Form
          </div>

          <h2 className="mt-5 text-3xl font-bold tracking-tight text-white">
            Send me a message
          </h2>

          <p className="mt-3 max-w-lg leading-relaxed text-slate-400">
            Have an idea, collaboration, startup, or project in mind?
            Fill out the form and I’ll get back to you soon.
          </p>
        </div>

        {/* Fields */}
        <div className="mt-10 flex flex-col gap-6">
          {/* Name */}
          <label className="flex flex-col gap-3">
            <span className="text-sm font-medium text-slate-300">
              Your Name
            </span>

            <input
              type="text"
              name="user_name"
              required
              placeholder="Ashwani Singh"
              className="
                h-14
                rounded-2xl
                border
                border-white/10
                bg-black/20
                px-5
                text-white
                placeholder:text-slate-500
                outline-none
                transition-all
                duration-300
                focus:border-fuchsia-500/50
                focus:bg-black/30
                focus:ring-4
                focus:ring-fuchsia-500/10
              "
            />
          </label>

          {/* Email */}
          <label className="flex flex-col gap-3">
            <span className="text-sm font-medium text-slate-300">
              Email Address
            </span>

            <input
              type="email"
              name="user_email"
              required
              placeholder="you@example.com"
              className="
                h-14
                rounded-2xl
                border
                border-white/10
                bg-black/20
                px-5
                text-white
                placeholder:text-slate-500
                outline-none
                transition-all
                duration-300
                focus:border-cyan-500/50
                focus:bg-black/30
                focus:ring-4
                focus:ring-cyan-500/10
              "
            />
          </label>

          {/* Message */}
          <label className="flex flex-col gap-3">
            <span className="text-sm font-medium text-slate-300">
              Message
            </span>

            <textarea
              name="user_message"
              required
              rows={6}
              placeholder="Tell me about your project..."
              className="
                rounded-2xl
                border
                border-white/10
                bg-black/20
                px-5
                py-4
                text-white
                placeholder:text-slate-500
                outline-none
                resize-none
                transition-all
                duration-300
                focus:border-indigo-500/50
                focus:bg-black/30
                focus:ring-4
                focus:ring-indigo-500/10
              "
            />
          </label>
        </div>

        {/* Bottom */}
        <div className="mt-8 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="
              group
              inline-flex
              items-center
              justify-center
              gap-3
              rounded-2xl
              bg-gradient-to-r
              from-fuchsia-500
              via-violet-500
              to-cyan-500
              px-7
              py-4
              font-medium
              text-white
              shadow-[0_10px_40px_rgba(168,85,247,0.3)]
              transition-all
              duration-300
              hover:scale-[1.02]
              hover:shadow-[0_20px_60px_rgba(168,85,247,0.45)]
              disabled:cursor-not-allowed
              disabled:opacity-70
            "
          >
            {loading ? (
              <>
                <Loader2
                  size={18}
                  className="animate-spin"
                />
                Sending...
              </>
            ) : (
              <>
                <Send
                  size={18}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
                Send Message
              </>
            )}
          </button>

          {/* Status */}
          <div className="min-h-[24px]">
            {status === "success" && (
              <div className="flex items-center gap-2 text-emerald-400">
                <CheckCircle2 size={18} />

                <span className="text-sm">
                  Message sent successfully.
                </span>
              </div>
            )}

            {status === "error" && (
              <div className="flex items-center gap-2 text-rose-400">
                <AlertCircle size={18} />

                <span className="text-sm">
                  {errorMessage}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Footer Note */}
        <div
          className="
            mt-8
            rounded-2xl
            border
            border-white/10
            bg-black/20
            px-5
            py-4
          "
        >
          <p className="text-sm leading-relaxed text-slate-400">
            I usually respond within{" "}
            <span className="font-medium text-slate-200">
              24–48 hours
            </span>
            . Looking forward to hearing about your idea.
          </p>
        </div>
      </div>
    </form>
  );
}