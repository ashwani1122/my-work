import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { Send, Loader2, CheckCircle2, AlertCircle } from "lucide-react";

const inputClass = `
  w-full h-11 rounded-lg px-4 text-sm outline-none transition-colors duration-200
  border border-[#e0e0e0] bg-white text-[#111] placeholder:text-[#bbb]
  focus:border-[#b0b0b0]
  dark:border-[#222] dark:bg-[#111] dark:text-white dark:placeholder:text-[#444]
  dark:focus:border-[#444]
`.trim();

const textareaClass = `
  w-full rounded-lg px-4 py-3 text-sm outline-none resize-none transition-colors duration-200
  border border-[#e0e0e0] bg-white text-[#111] placeholder:text-[#bbb]
  focus:border-[#b0b0b0]
  dark:border-[#222] dark:bg-[#111] dark:text-white dark:placeholder:text-[#444]
  dark:focus:border-[#444]
`.trim();

export default function ContactForm() {
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
      .sendForm("service_lz2t0d8", "template_rs1y17a", form.current, {
        publicKey: "nedFjalZ23r9TMb6Z",
      })
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
    <form ref={form} onSubmit={sendEmail} aria-live="polite" className="flex flex-col gap-5">
      <div>
        <label className="block text-xs font-medium text-[#888] dark:text-[#666] mb-2">
          Your Name
        </label>
        <input
          type="text"
          name="user_name"
          required
          placeholder="Ashwani Singh"
          className={inputClass}
        />
      </div>

      <div>
        <label className="block text-xs font-medium text-[#888] dark:text-[#666] mb-2">
          Email Address
        </label>
        <input
          type="email"
          name="user_email"
          required
          placeholder="you@example.com"
          className={inputClass}
        />
      </div>

      <div>
        <label className="block text-xs font-medium text-[#888] dark:text-[#666] mb-2">
          Message
        </label>
        <textarea
          name="user_message"
          required
          rows={5}
          placeholder="Tell me about your project..."
          className={textareaClass}
        />
      </div>

      <div className="flex items-center justify-between gap-4 flex-wrap">
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center gap-2 rounded-lg bg-[#111] dark:bg-white px-5 py-2.5 text-sm font-medium text-white dark:text-black hover:bg-[#333] dark:hover:bg-[#e5e5e5] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <Loader2 size={15} className="animate-spin" />
              Sending...
            </>
          ) : (
            <>
              <Send size={15} />
              Send Message
            </>
          )}
        </button>

        <div className="min-h-[20px]">
          {status === "success" && (
            <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 text-sm">
              <CheckCircle2 size={15} />
              Sent successfully.
            </div>
          )}
          {status === "error" && (
            <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400 text-sm">
              <AlertCircle size={15} />
              {errorMessage}
            </div>
          )}
        </div>
      </div>
    </form>
  );
}
