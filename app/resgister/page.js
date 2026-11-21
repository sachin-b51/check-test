
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin(event) {
    event.preventDefault();

    const paperId = new URLSearchParams(window.location.search).get("paperId");
    const nextPage = paperId
      ? `/instruction?paperId=${encodeURIComponent(paperId)}`
      : "/instruction";

    router.push(nextPage);
  }

  return (
    <main
      className="flex min-h-screen items-center justify-center px-4 py-10"
      style={{
        backgroundColor: "#102b4d",
        backgroundImage:
          "radial-gradient(rgba(255,255,255,0.13) 1px, transparent 1px)",
        backgroundSize: "18px 18px",
      }}
    >
      <section className="w-full max-w-[600px] rounded-md bg-white px-7 py-9 shadow-xl sm:px-11 sm:py-12">
        <h1 className="mb-6 border-b border-slate-200 pb-4 text-[23px] font-bold text-slate-900">
            Hey Learner
        </h1>

        <form onSubmit={handleLogin}>
          <div className="mb-5">
            <label
              htmlFor="username"
              className="mb-2 block text-sm font-medium text-slate-800"
            >
              Username
            </label>
            <input
              id="username"
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              autoComplete="username"
              required
              className="h-12 w-full rounded border border-slate-300 bg-slate-100 px-4 text-sm text-slate-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />
          </div>

          <div className="mb-8">
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-medium text-slate-800"
            >
                Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              autoComplete="current-password"
              required
              className="h-12 w-full rounded border border-slate-300 bg-slate-100 px-4 text-sm text-slate-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />
          </div>

          <button
            type="submit"
            className="h-14 w-full rounded bg-[#2d5975] text-base font-bold text-white shadow-md transition hover:bg-[#21465f] active:scale-[0.99]"
          >
            LOGIN
          </button>

          <p className="mt-3 text-center font-semibold text-orange-500">
              Click Login To proceed
          </p>
        </form>
      </section>
    </main>
  );
}
