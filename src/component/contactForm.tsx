import { useRef } from "react";
import emailjs from "@emailjs/browser";

export default function ContactForm() {
  const form = useRef<HTMLFormElement>(null);

  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault();

    if (form.current) {
    emailjs
        .sendForm(
        "service_0o6ab12",
        "template_bb2o05d",
        form.current,
        "9qsVu4HewnM5xc0l1"
    )
        .then(
        () => {
            alert("Message sent successfully!");
            },
            (error) => {
            alert("Failed to send: " + error.text);
        }
        );
    }
};

    return (
        <form ref={form} onSubmit={sendEmail} style={{display:"flex",flexDirection:"column", gap:"1rem", backgroundColor:"#0f172a",padding:"1rem",borderRadius:"10px",color:"white"}}>
            <h1>Send  a Message</h1>
            <p>Fill out the form below I'll get back to you as soon as possible.</p>
        <input style={{padding:"0.5rem",border:"2px solid black" ,
            backgroundColor:"#1e293b",borderRadius:"10px",color:"white"}} type="text" name="user_name" placeholder="Your Name" required className="border p-2 rounded" />
        <input style={{padding:"0.5rem",border:"2px solid black" ,
            backgroundColor:"#1e293b",
            borderRadius:"10px" ,color:"white"}}  type="email" name="user_email" placeholder="Your Email" required className="border p-2 rounded" />
        <textarea rows={4} style={{padding:"0.2rem",
            border:"2px solid black" ,
            backgroundColor:"#1e293b",borderRadius:"10px",color:"white"}} name="user_message" placeholder="Your Message" required className="border p-2 rounded" />
        <button type="submit" style={{backgroundColor:"#007bff",
            cursor:"pointer"
            ,padding:"0.5rem",border:"1px solid white" ,borderRadius:"10px"}}>Send Message</button>
        </form>
    );
}
