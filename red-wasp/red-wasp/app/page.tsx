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
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  const works = [
    {
      src: "/work/KFC.mp4",
      poster: "/work/KFC.jpg",
      brand: "KFC",
      title: "Adventure chicken",
      result: "12M+ views · CTR +38%",
    },
  ];

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
      {/* HEADER */}
      <div className="fixed top-4 left-4 right-4 z-50 flex justify-between items-center">
        <h1 className="text-white text-lg sm:text-xl md:text-2xl font-bold">RED WASP</h1>
        <div className="flex items-center gap-x-4 sm:gap-x-8">
          <a
            href="#about"
            className="text-white text-sm sm:text-lg font-bold"
          >
            ABOUT US
          </a>
          <a
            href="#contact"
            className="text-white text-sm sm:text-lg font-bold"
          >
            CONTACT US
          </a>
        </div>
      </div>
      {/* HERO SECTION */}
      <section className="relative w-full h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/hero.mp4" type="video/mp4" />
        </video>

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/50"></div>

        <div className="relative z-10 flex-1 space-y-4 sm:space-y-6 mt-16 sm:mt-24 lg:mt-32 px-6 sm:px-12 lg:px-20">
          <p className="uppercase tracking-[0.3em] text-xs text-gray-400 text-left">
            AI CREATIVE STUDIO
          </p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-semibold leading-tight text-left">
            Videos & visuals
            <br />
            that actually go viral.
          </h1>
          <p className="text-sm sm:text-base text-gray-300 max-w-xl text-left">
            We craft bold, scroll-stopping campaigns using AI, motion, and
            storytelling so your brand doesn&apos;t just show up—it takes over
            the feed.
          </p>

        </div>
      </section>

      {/* ABOUT US SECTION */}
      <section
        id="about"
        className="px-4 sm:px-6 lg:px-20 py-16 border-t border-gray-900"
      >
        <div className="space-y-6">
          <h2 className="text-sm uppercase tracking-[0.3em] text-gray-400 text-left">
            About us
          </h2>
          <div className="space-y-4">
            <p className="text-xl md:text-2xl font-bold text-gray-300 text-left">
              We the creative studio where human imagination meets artificial intelligence.
            </p>
            <p className="text-xl md:text-2xl font-bold text-gray-300 text-left">
              We blend strategic thinking, artistic intuition, and advanced AI tools to bring bold ideas to life. Every project is driven by creativity first — with technology enhancing, not replacing, the human touch.
            </p>
            <p className="text-xl md:text-2xl font-bold text-gray-300 text-left">
              We don’t just create visuals or campaigns.
              We design experiences, build identities, and transform concepts into living, breathing creative work.
            </p>
          </div>
        </div>
      </section>

      {/* Overlay to ensure text readability */}

      {/* WORK SECTION */}
      <section
        id="work"
        className="py-16 border-t border-gray-900"
      >
        <div className="px-6 sm:px-12 lg:px-20 mb-8">
          <div>
            <h2 className="text-sm uppercase tracking-[0.3em] text-gray-400 text-left">
              Our work
            </h2>
            <p className="text-2xl sm:text-3xl mt-2 text-left">
              Campaigns, spots & viral clips.
            </p>
          </div>
        </div>

        <div className="space-y-8">
          {works.map((work, index) => (
            <div
              key={index}
              className="relative w-full aspect-video overflow-hidden bg-black cursor-pointer"
              onClick={() => playingIndex !== index && setPlayingIndex(index)}
            >
              {playingIndex === index ? (
                <div className="relative w-full h-full">
                  <video
                    src={work.src}
                    poster={work.poster}
                    controls
                    autoPlay
                    preload="metadata"
                    onEnded={() => setPlayingIndex(null)}
                    className="w-full h-full object-cover"
                  />
                  <button
                    onClick={() => setPlayingIndex(null)}
                    className="absolute top-4 left-4 bg-black/50 text-white px-3 py-1 rounded hover:bg-black/70"
                  >
                    ✕
                  </button>
                </div>
              ) : (
                <>
                  <img
                    src={work.poster}
                    alt={work.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/20"></div>
                  <div className="absolute top-0 left-0 right-0 p-4 sm:p-6 lg:p-8 bg-gradient-to-b from-black/80 to-transparent">
                    <p className="text-3xl font-bold uppercase tracking-[0.3em] text-gray-300">
                      {work.brand}
                    </p>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 lg:p-8 bg-gradient-to-t from-black/80 to-transparent">
                    <p className="text-lg font-medium">{work.title}</p>
                    <p className="text-sm text-gray-300">
                      {work.result}
                    </p>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section
        id="contact"
        className="px-6 sm:px-12 lg:px-20 py-16 border-t border-gray-900"
      >
        <div className="grid md:grid-cols-2 gap-6 md:gap-10 items-start">
          <div className="space-y-4">
            <h2 className="text-sm uppercase tracking-[0.3em] text-gray-400 text-left">
              Contact us
            </h2>
            <p className="text-2xl sm:text-3xl text-left">
              Tell us about your brand. <br />
              We&apos;ll bring the ideas.
            </p>
            <p className="text-gray-400 text-sm text-left">
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

      <footer className="px-6 sm:px-12 lg:px-20 py-6 border-t border-gray-900 text-xs text-gray-500 flex flex-col sm:flex-row justify-between items-center gap-2">
        <span>© {year} RED WASP MEDIA</span>
        <span>Terms · Privacy</span>
      </footer>
    </main>
  );
}
