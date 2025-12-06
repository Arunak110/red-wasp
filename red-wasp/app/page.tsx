"use client";

import { useState, useEffect, FormEvent } from "react";

type Status = "idle" | "loading" | "success" | "error";

interface FormState {
  name: string;
  email: string;
  company: string;
  message: string;
}

export default function Home() {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    company: "",
    message: "",
  });

  const [status, setStatus] = useState<Status>("idle");
  const [year, setYear] = useState<number>(0);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setStatus("success");
        setForm({ name: "", email: "", company: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  }

  return (
    <main className="min-h-screen">
      {/* FLOATING LINKS */}
      <div className="fixed top-4 left-6 md:left-12 lg:left-20 z-50">
        <a
          href="#about"
          className="text-white text-xl font-bold"
        >
          ABOUT US
        </a>
      </div>
      <div className="fixed top-4 right-6 md:right-12 lg:right-20 z-50">
        <a
          href="#contact"
          className="text-white text-xl font-bold"
        >
          CONTACT US
        </a>
      </div>
      {/* HERO SECTION */}
      <section className="relative w-full h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/hero.mp4" type="video/mp4" />
        </video>

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/50"></div>

        <div className="relative z-10 flex-1 space-y-6 mt-32 px-6 md:px-12 lg:px-20">
          <p className="uppercase tracking-[0.3em] text-xs text-gray-400">
            AI CREATIVE STUDIO
          </p>
          <h1 className="text-5xl md:text-8xl font-semibold leading-tight text-white text-left">
            Videos & visuals
            <br />
            that actually go viral.
          </h1>
          <p className="text-gray-300 max-w-xl">
            We craft bold, scroll-stopping campaigns using AI, motion, and
            storytelling so your brand doesn&apos;t just show up—it takes over
            the feed.
          </p>

        </div>
      </section>

      {/* Overlay to ensure text readability */}

      {/* WORK SECTION */}
      <section
        id="work"
        className="px-6 md:px-12 lg:px-20 py-16 border-t border-gray-900"
      >
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-sm uppercase tracking-[0.3em] text-gray-400">
              Our work
            </h2>
            <p className="text-2xl md:text-3xl mt-2">
              Campaigns, spots & viral clips.
            </p>
          </div>
          <span className="text-xs text-gray-500">
            Replace these blocks with your real videos & images.
          </span>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="group rounded-2xl border border-gray-800 overflow-hidden"
            >
              <div className="aspect-video bg-gray-800 flex items-center justify-center text-gray-400 text-xs">
                Video / image {i}
              </div>
              <div className="p-4 space-y-1">
                <p className="text-xs uppercase tracking-[0.2em] text-gray-500">
                  BRAND NAME
                </p>
                <p className="text-sm font-medium">Campaign title goes here</p>
                <p className="text-xs text-gray-500">
                  Short result: &gt; 10M views, CTR +40%, etc.
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section
        id="contact"
        className="px-6 md:px-12 lg:px-20 py-16 border-t border-gray-900"
      >
        <div className="grid md:grid-cols-2 gap-10 items-start">
          <div className="space-y-4">
            <h2 className="text-sm uppercase tracking-[0.3em] text-gray-400">
              Contact us
            </h2>
            <p className="text-2xl md:text-3xl">
              Tell us about your brand. <br />
              We&apos;ll bring the ideas.
            </p>
            <p className="text-gray-400 text-sm">
              Share a quick brief or just a problem you&apos;re trying to solve.
              We usually respond within 24–48 hours.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <input
                className="bg-black border border-gray-700 rounded-lg px-4 py-3 text-sm outline-none focus:border-gray-300 font-bold"
                placeholder="Your name*"
                value={form.name}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, name: e.target.value }))
                }
                required
              />
              <input
                className="bg-black border border-gray-700 rounded-lg px-4 py-3 text-sm outline-none focus:border-gray-300 font-bold"
                placeholder="Email*"
                type="email"
                value={form.email}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, email: e.target.value }))
                }
                required
              />
            </div>
            <input
              className="bg-black border border-gray-700 rounded-lg px-4 py-3 text-sm outline-none focus:border-gray-300 w-full font-bold"
              placeholder="Company / brand"
              value={form.company}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, company: e.target.value }))
              }
            />
            <textarea
              className="bg-black border border-gray-700 rounded-lg px-4 py-3 text-sm outline-none focus:border-gray-300 w-full min-h-[120px] font-bold"
              placeholder="Tell us about the project, goals, budget, timeline..."
              value={form.message}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, message: e.target.value }))
              }
              required
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="px-6 py-3 rounded-full bg-white text-black text-sm font-medium disabled:opacity-60"
            >
              {status === "loading" ? "Sending..." : "Submit enquiry"}
            </button>

            {status === "success" && (
              <p className="text-xs text-green-400">
                Thanks! Your message has been sent.
              </p>
            )}
            {status === "error" && (
              <p className="text-xs text-red-400">
                Something went wrong. Please try again.
              </p>
            )}
          </form>
        </div>
      </section>

      <footer className="px-6 md:px-12 lg:px-20 py-6 border-t border-gray-900 text-xs text-gray-500 flex justify-between">
        <span>© {year} RED WASP MEDIA</span>
        <span>Terms · Privacy</span>
      </footer>
    </main>
  );
}
