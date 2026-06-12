import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { Send, Loader2, CheckCircle2, AlertCircle } from "lucide-react";

const inputClass = `
  w-full h-11 rounded-none px-4 text-sm font-bold outline-none
  border-2 border-black bg-[#f4f1ea] text-black placeholder:text-neutral-400 placeholder:font-normal
  focus:bg-[#ffe600] focus:placeholder:text-black/40
  dark:border-white dark:bg-black dark:text-white dark:placeholder:text-neutral-600
  dark:focus:bg-[#ffe600] dark:focus:text-black dark:focus:placeholder:text-black/40
`.trim();

const textareaClass = `
  w-full rounded-none px-4 py-3 text-sm font-bold outline-none resize-none
  border-2 border-black bg-[#f4f1ea] text-black placeholder:text-neutral-400 placeholder:font-normal
  focus:bg-[#ffe600] focus:placeholder:text-black/40
  dark:border-white dark:bg-black dark:text-white dark:placeholder:text-neutral-600
  dark:focus:bg-[#ffe600] dark:focus:text-black dark:focus:placeholder:text-black/40
`.trim();

const labelClass = "block text-xs font-bold uppercase tracking-widest mb-2 before:content-['>_'] before:text-[#b8a600] dark:before:text-[#ffe600]";

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
        <label className={labelClass}>
          user_name:
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
        <label className={labelClass}>
          email_address:
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
        <label className={labelClass}>
          message:
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
          className="inline-flex items-center gap-2 rounded-none border-2 border-black dark:border-white bg-black dark:bg-white px-5 py-2.5 text-sm font-bold uppercase text-white dark:text-black shadow-[4px_4px_0px_0px_#000] dark:shadow-[4px_4px_0px_0px_#fff] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none hover:bg-[#ffe600] hover:text-black dark:hover:bg-[#ffe600] dark:hover:text-black disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <Loader2 size={15} className="animate-spin" />
              SENDING...
            </>
          ) : (
            <>
              <Send size={15} />
              SEND_MESSAGE
            </>
          )}
        </button>

        <div className="min-h-[20px]">
          {status === "success" && (
            <div className="flex items-center gap-2 text-xs font-bold uppercase border-2 border-black dark:border-white bg-green-400 text-black px-3 py-1.5">
              <CheckCircle2 size={15} />
              SENT_OK
            </div>
          )}
          {status === "error" && (
            <div className="flex items-center gap-2 text-xs font-bold uppercase border-2 border-black dark:border-white bg-red-400 text-black px-3 py-1.5">
              <AlertCircle size={15} />
              {errorMessage}
            </div>
          )}
        </div>
      </div>
    </form>
  );
}
