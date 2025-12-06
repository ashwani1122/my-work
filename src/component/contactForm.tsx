import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

export default function ContactForm(): JSX.Element {
  const form = useRef<HTMLFormElement | null>(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<null | "success" | "error">(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.current) return;

    setLoading(true);
    setStatus(null);
    setErrorMessage(null);

    emailjs
      .sendForm(
        "service_0o6ab12",
        "template_bb2o05d",
        form.current,
        "9qsVu4HewnM5xc0l1"
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
          setErrorMessage(error?.text ?? "Something went wrong. Please try again.");
        }
      );
  };

  return (
    <form
      ref={form}
      onSubmit={sendEmail}
      className="w-full max-w-lg bg-slate-800/60 border border-slate-700 rounded-2xl p-5 shadow-md backdrop-blur-sm flex flex-col gap-4"
      aria-live="polite"
    >
      <div>
        <h2 className="text-lg font-semibold text-slate-100">Send a message</h2>
        <p className="mt-1 text-sm text-slate-300">
          Fill out the form below — I’ll get back to you as soon as possible.
        </p>
      </div>

      <label className="flex flex-col gap-2">
        <span className="text-sm text-slate-200">Name</span>
        <input
          type="text"
          name="user_name"
          placeholder="Your name"
          required
          className="w-full px-3 py-2 rounded-lg bg-slate-700 border border-slate-600 text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          aria-label="Your name"
        />
      </label>

      <label className="flex flex-col gap-2">
        <span className="text-sm text-slate-200">Email</span>
        <input
          type="email"
          name="user_email"
          placeholder="you@domain.com"
          required
          className="w-full px-3 py-2 rounded-lg bg-slate-700 border border-slate-600 text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          aria-label="Your email"
        />
      </label>

      <label className="flex flex-col gap-2">
        <span className="text-sm text-slate-200">Message</span>
        <textarea
          name="user_message"
          rows={2}
          placeholder="Write your message..."
          required
          className="w-full px-3 py-2 rounded-lg bg-slate-700 border border-slate-600 text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition resize-none"
          aria-label="Your message"
        />
      </label>

      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={loading}
          className={`inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-shadow
            ${loading ? "bg-indigo-400/60 cursor-wait" : "bg-gradient-to-r from-indigo-500 to-violet-500 hover:from-indigo-600 hover:to-violet-600"}
            text-white shadow-sm`}
        >
          {loading ? "Sending..." : "Send Message"}
        </button>

        {/* small status indicators */}
        <div className="ml-auto min-w-[140px]">
          {status === "success" && (
            <p className="text-sm text-emerald-400">✅ Message sent. Thank you!</p>
          )}
          {status === "error" && (
            <p className="text-sm text-rose-400">❌ {errorMessage ?? "Failed to send."}</p>
          )}
        </div>
      </div>

      <p className="text-xs text-slate-400 mt-1">
        By sending you agree to be contacted. I generally reply within 1-2 business days.
      </p>
    </form>
  );
}
