
"use client";

import {
  Phone,
  Mail,
  ArrowUpRight,
  ArrowRight,
} from "lucide-react";

export default function Contact() {
  return (
    <main className="mt-16 sm:mt-18 lg:mt-21 bg-slate-50 px-3.5 sm:px-6 md:px-10 py-6 sm:py-8 md:py-10">
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 items-stretch gap-8 sm:gap-10 lg:grid-cols-2 lg:gap-20">

        {/* LEFT SECTION */}
        <section className="flex h-full flex-col">
          <p className="text-[11px] sm:text-xs font-bold uppercase tracking-widest text-blue-600">
            Get in Touch
          </p>

          <h1 className="mt-2.5 sm:mt-3 text-2xl sm:text-3xl font-bold tracking-tight text-slate-950">
            Contact Online Mocks
          </h1>

          <p className="mt-2.5 sm:mt-3 text-xs sm:text-sm leading-5 text-slate-500">
            Have questions about GAT MCQ syllabus, NID/NIFT paper
            patterns, or WhatsApp manual course registration approvals?
            Send us a message or chat with us.
          </p>

          {/* CONTACT DETAILS */}
          <div className="mt-6 sm:mt-7 space-y-4 sm:space-y-5">
            <div className="flex items-center gap-3.5 sm:gap-4">
              <div className="flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-xl sm:rounded-2xl bg-blue-50 text-blue-600">
                <Phone size={18} className="sm:size-[20px]" />
              </div>

              <div>
                <p className="text-[11px] sm:text-xs font-semibold text-slate-400">
                  Counseling Hotline
                </p>
                <a
                  href="tel:+918750591056"
                  className="text-xs sm:text-sm font-bold text-slate-950 hover:text-blue-600"
                >
                  +91 8750591056
                </a>
              </div>
            </div>

            <div className="flex items-center gap-3.5 sm:gap-4">
              <div className="flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-xl sm:rounded-2xl bg-blue-50 text-blue-600">
                <Mail size={18} className="sm:size-[20px]" />
              </div>

              <div>
                <p className="text-[11px] sm:text-xs font-semibold text-slate-400">
                  Email Address
                </p>
                <a
                  href="mailto:mail@testvillage.com"
                  className="text-xs sm:text-sm font-bold text-slate-950 hover:text-blue-600"
                >
                  mail@testvillage.com
                </a>
              </div>
            </div>
          </div>

          {/* WHATSAPP CARD */}
          <div className="mt-6 sm:mt-7 rounded-[18px] sm:rounded-[20px] border border-slate-900 bg-emerald-50 p-4 sm:p-5">
            <h2 className="flex items-center gap-2 text-xs sm:text-sm font-bold uppercase tracking-wide text-emerald-800">
              <Phone size={14} className="sm:size-[15px]" fill="currentColor" />
              Direct WhatsApp Support Desk
            </h2>

            <p className="mt-2 text-xs font-semibold leading-5 sm:leading-6 text-slate-600">
              Skip standard email delays! Chat directly with a
              counselor to activate your registered student account
              or unlock courses immediately.
            </p>

            <a
              href="https://wa.me/918750591056"
              target="_blank"
              rel="noreferrer"
              className="mt-3 inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-3.5 py-2 sm:py-2.5 text-xs font-bold text-white transition hover:bg-emerald-700">
              Chat on WhatsApp</a>
          </div>
        </section>

        {/* RIGHT SECTION: ENQUIRY FORM */}
        <section className="h-full rounded-[18px] sm:rounded-[20px] border border-slate-900 bg-white p-5 sm:p-6 shadow-sm">
          <h2 className="text-lg sm:text-[20px] font-bold text-slate-900">
            Send an Enquiry Message
          </h2>

          <form
            className="mt-5 sm:mt-7 space-y-4 sm:space-y-5"
            onSubmit={(event) => {
              event.preventDefault();
              alert("Form submitted! Connect a backend to send your message.");
            }}>
            {/* NAME */}
            <div>
              <label
                htmlFor="name"
                className="mb-1.5 sm:mb-2 block text-xs font-semibold text-slate-800">Your Name
              </label>

              <input
                id="name"
                name="name"
                type="text"
                placeholder="e.g. Rohan Sharma"
                className="h-10 sm:h-11 w-full rounded-[13px] sm:rounded-[15px] border border-slate-200 bg-slate-50 px-3.5 sm:px-4 text-xs text-slate-900 outline-none placeholder:text-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            {/* EMAIL */}
            <div>
              <label
                htmlFor="email"
                className="mb-1.5 sm:mb-2 block text-xs font-semibold text-slate-800"
              >
                Email Address
              </label>

              <input
                id="email"
                name="email"
                type="email"
                placeholder="e.g. rohan@gmail.com"
                required
                className="h-10 sm:h-11 w-full rounded-[13px] sm:rounded-[15px] border border-slate-200 bg-slate-50 px-3.5 sm:px-4 text-xs text-slate-900 outline-none placeholder:text-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            {/* MESSAGE */}
            <div>
              <label
                htmlFor="message"
                className="mb-1.5 sm:mb-2 block text-xs font-semibold text-slate-800"
              >
                How can we help you?
              </label>

              <textarea
                id="message"
                name="message"
                rows={4}
                placeholder="Specify the exam syllabus (NIFT, NID, CEED) or package activation assistance..."
                required
                className="min-h-[85px] sm:min-h-[100px] w-full resize-y rounded-[13px] sm:rounded-[15px] border border-slate-200 bg-slate-50 px-3.5 sm:px-4 py-2.5 sm:py-3 text-xs text-slate-900 outline-none placeholder:text-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            {/* SUBMIT BUTTON */}
            <button
              type="submit"
              className="flex h-10 sm:h-11 w-full items-center justify-center gap-2 rounded-[13px] sm:rounded-[15px] bg-blue-600 px-4 text-xs sm:text-[13px] font-bold text-white shadow-sm transition hover:bg-blue-700"
            >
              Send Message
              <ArrowRight size={15} />
            </button>
          </form>
        </section>

      </div>
    </main>
  );
}
