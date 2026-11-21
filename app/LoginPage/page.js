
"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";

export default function LoginPage({ isOpen, onClose, onLoginSuccess }) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    // Save login status and user identity
    localStorage.setItem("userLoggedIn", "true");
    if (email) {
      localStorage.setItem("userEmail", email);
      const nameGuess = email.split("@")[0];
      const formattedName = nameGuess.charAt(0).toUpperCase() + nameGuess.slice(1);
      localStorage.setItem("studentName", formattedName);
    }
    // Fire storage event for Header synchronization across tabs/components
    window.dispatchEvent(new Event("storage"));

    if (onLoginSuccess) {
      onLoginSuccess();
    }
    if (onClose) {
      onClose();
    }
    router.push("/student-dashboard");
  };
  return (
    <div
      className="fixed inset-0 z-[50] flex items-center justify-center
      overflow-y-auto bg-slate-950/60 p-3 backdrop-blur-md"
      style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}>

      {/* Hide scrollbar for Webkit browsers */}
      <style>{`
        .login-dialog::-webkit-scrollbar { display: none; }
        .login-backdrop::-webkit-scrollbar { display: none; }
      `}</style>

      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="login-title"
        className="login-dialog relative grid w-full max-w-[92vw] sm:max-w-md md:max-w-2xl grid-cols-1 md:grid-cols-2 md:h-[480px] max-h-[90vh] overflow-y-auto rounded-2xl bg-white shadow-2xl"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>

        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close login"
          className="absolute right-2.5 top-2.5 z-10 rounded-full p-1.5 text-slate-500 transition hover:bg-slate-100">
          <X size={18} />
        </button>

        {/* LEFT SIDE (Laptop / Tablet) */}
        <div
          className="hidden md:flex flex-col items-center justify-center rounded-l-2xl bg-[#67bbfa] px-5 text-center">
          <img src="/balak.png" alt="Student preparing for exams" className="relative h-48 w-full max-w-[200px] object-contain mb-16" />

          <h2 className="mt-20 text-xl font-extrabold text-slate-800 absolute">Pahal Design</h2>

          <p className="mt-40 max-w-xs text-xs font-semibold leading-5 text-slate-600 absolute px-5">
            Prepare smarter, practice better, and move closer to your dream design college.
          </p>
        </div>

        {/* RIGHT SIDE: Login form */}
        <div className="flex flex-col justify-center rounded-r-2xl px-5 py-6 sm:px-6 sm:py-7">
          <div className="mb-2 text-center">
            <h2 className="text-lg font-extrabold tracking-tight text-slate-900">
              PAHAL <span className="text-blue-600">DESIGN</span>
            </h2>

            <h1
              id="login-title"
              className="mt-1.5 text-base font-bold text-slate-900"> Welcome Back </h1>
            <p className="mt-1 text-xs text-slate-500">
              Sign in to continue your learning journey.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-2.5">
            <div>
              <label
                htmlFor="login-email"
                className="mb-1 block text-xs font-medium text-slate-700">
                Username or email
              </label>

              <input
                id="login-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="username"
                required
                placeholder="Enter your email"
                className="w-full rounded-lg border border-slate-200
                bg-slate-50 px-3 py-2 text-xs outline-none
                focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <div>
              <label
                htmlFor="login-password"
                className="mb-1 block text-xs font-medium text-slate-700"
              >
                Password
              </label>

              <input
                id="login-password"
                type="password"
                autoComplete="current-password"
                required
                placeholder="Enter your password"
                className="w-full rounded-lg border border-slate-200
                bg-slate-50 px-3 py-2 text-xs outline-none
                focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />

              <div className="text-right mt-0.5">
                <a
                  href="/forgot-password"
                  className="text-xs font-medium text-blue-600 hover:underline"
                >
                  Forgot password?
                </a>
              </div>
            </div>

            <button
              type="submit"
              className="w-full rounded-lg bg-blue-600 px-3 py-2.5 mt-1
              text-xs font-semibold text-white transition hover:bg-blue-700">
              Sign In →
            </button>
          </form>

          <div className="my-4 flex items-center gap-3">
            <span className="h-px flex-1 bg-slate-200" />
            <span className="text-xs text-slate-400">or</span>
            <span className="h-px flex-1 bg-slate-200" />
          </div>

          <button
            type="button"
            className="flex w-full items-center justify-center gap-2 rounded-lg border bg-red-600 border-slate-200 px-3 py-2 text-xs font-medium text-white hover:bg-red-900">
            <span className="text-sm font-bold text-white">G</span>
            Continue with Google
          </button>

          <p className="mt-4 text-center text-xs text-slate-500">
            New here?{" "}
            <a
              href="/register"
              className="font-medium text-blue-600 hover:underline">
              Create an Account
            </a>
          </p>
        </div>
      </section>
    </div>
  );
}

