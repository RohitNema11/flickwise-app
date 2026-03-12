'use client';

import { useState } from "react";
import Link from "next/link";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await fetch("http://localhost:5000/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      setSubmitted(true);
      setForm({ name: "", email: "", phone: "", message: "" });
    } else {
      console.error("Server error");
    }
  } catch (err) {
    console.error("Error submitting form:", err);
  }
};


  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <h2 className="text-3xl font-bold mb-6">Contact Us</h2>
        <p className="mb-6 text-gray-400">
          Have something to say ? Drop us a review—we’re all ears !
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-black">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
            className="px-4 py-2 rounded bg-white"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={form.email}
            onChange={handleChange}
            className="px-4 py-2 rounded bg-white"
            required
          />
          <input
            type="text"
            name="phone"
            placeholder="Your Phone"
            value={form.phone}
            onChange={handleChange}
            className="px-4 py-2 rounded bg-white"
          />
          <textarea
            name="message"
            placeholder="Your Message"
            rows="4"
            value={form.message}
            onChange={handleChange}
            className="px-4 py-2 rounded resize-none bg-white"
            required
          />
          <button
            type="submit"
            className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded font-semibold cursor-pointer"
          >
            Send Message
          </button>
        </form>

        {submitted && (
          <p className="text-green-500 mt-4">
            Message sent successfully !
          </p>
        )}

        <Link href="/reviews">
  <button className="mt-4 bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-600 cursor-pointer">
    See All Reviews
  </button>
</Link>
      </div>

    </div>
  );
}
