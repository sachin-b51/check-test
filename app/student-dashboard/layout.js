"use client";

import { useState, useEffect, useId } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  BarChart2,
  User,
  Sparkles,
  Gift,
  GraduationCap,
  Bell,
  LogOut,
  Video,
} from "lucide-react";

const apiBaseUrl = (
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"
).replace(/\/$/, "");

function StudentAvatar() {
  const avatarId = useId().replace(/:/g, "");

  return (
    <svg className="student-avatar" viewBox="0 0 96 112" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id={`${avatarId}-skin`} x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="#f8d5b5" />
          <stop offset="1" stopColor="#d99a70" />
        </linearGradient>
        <linearGradient id={`${avatarId}-shirt`} x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="#172554" />
          <stop offset="1" stopColor="#0f172a" />
        </linearGradient>
        <linearGradient id={`${avatarId}-hair`} x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#24150f" />
          <stop offset=".48" stopColor="#583a2b" />
          <stop offset="1" stopColor="#2b1b16" />
        </linearGradient>
        <filter id={`${avatarId}-depth`} x="-20%" y="-20%" width="140%" height="150%">
          <feDropShadow dx="0" dy="1.5" stdDeviation="1.2" floodColor="#0f172a" floodOpacity=".24" />
        </filter>
      </defs>
      <ellipse cx="48" cy="106" rx="26" ry="3" fill="#0f172a" opacity=".2" />
      <path d="M19 108V89c0-15 12-25 29-25s29 10 29 25v19Z" fill={`url(#${avatarId}-shirt)`} filter={`url(#${avatarId}-depth)`} />
      <path d="M39 54h18v16H39z" fill={`url(#${avatarId}-skin)`} />
      <ellipse cx="29" cy="39" rx="5" ry="7" fill="#e5ad87" />
      <ellipse cx="67" cy="39" rx="5" ry="7" fill="#e5ad87" />
      <path d="M30 30c0-14 8-22 18-22s18 8 18 22v15c0 13-8 22-18 22s-18-9-18-22Z" fill={`url(#${avatarId}-skin)`} filter={`url(#${avatarId}-depth)`} />
      <path d="M28 34c-2-17 6-27 20-28 15-1 23 9 21 27l-7-5c-5 0-10-3-14-7-4 5-11 8-18 8Z" fill={`url(#${avatarId}-hair)`} />
      <path d="M35 21c5-7 12-10 20-8" fill="none" stroke="#a77c5d" strokeWidth="2" strokeLinecap="round" opacity=".55" />
      <path d="M36 37c2-2 5-2 7 0M53 37c2-2 5-2 7 0" fill="none" stroke="#50352c" strokeWidth="1.8" strokeLinecap="round" />
      <ellipse cx="40" cy="42" rx="1.7" ry="2.1" fill="#263238" />
      <ellipse cx="56" cy="42" rx="1.7" ry="2.1" fill="#263238" />
      <ellipse cx="37" cy="47" rx="3" ry="1.5" fill="#e99a83" opacity=".35" />
      <ellipse cx="59" cy="47" rx="3" ry="1.5" fill="#e99a83" opacity=".35" />
      <path d="M48 43l-2 7 4 1M43 55c3 2 7 2 10 0" fill="none" stroke="#9a5e48" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M27 89c1-11 8-17 17-21" fill="none" stroke="#647fb4" strokeWidth="2" opacity=".55" />
      <g className="student-avatar-arms" fill="none" stroke={`url(#${avatarId}-skin)`} strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" filter={`url(#${avatarId}-depth)`}>
        <path d="M28 74c10 2 16 10 27 12l14-9" />
        <path d="M68 73c-9 4-15 10-25 12l-15-6" />
      </g>
      <path d="M38 66c3 3 7 4 10 4s7-1 10-4" fill="none" stroke="#d7e5ff" strokeWidth="2" opacity=".8" />
    </svg>
  );
}

export default function StudentDashboardLayout({ children }) {
  const pathname = usePathname();
  const [student, setStudent] = useState({
    name: "Sachin Kumar",
    plan: "Free Plan",
  });

  useEffect(() => {
    const body = document.body;
    const previousOverflow = body.style.overflow;
    const desktopViewport = window.matchMedia("(min-width: 1024px)");
    const updateScrollLock = () => {
      if (desktopViewport.matches) {
        body.style.overflow = "hidden";
        window.scrollTo(0, 0);
      } else {
        body.style.overflow = previousOverflow;
      }
    };

    updateScrollLock();
    desktopViewport.addEventListener("change", updateScrollLock);
    return () => {
      desktopViewport.removeEventListener("change", updateScrollLock);
      body.style.overflow = previousOverflow;
    };
  }, []);

  useEffect(() => {
    async function loadStudent() {
      try {
        const res = await fetch(`${apiBaseUrl}/lms/student-dashboard`);
        const data = await res.json();
        if (data.success && data.student) {
          setStudent(data.student);
          if (data.student.name) {
            localStorage.setItem("userLoggedIn", "true");
            localStorage.setItem("studentName", data.student.name);
            window.dispatchEvent(new Event("storage"));
          }
        }
      } catch (err) {
        // Fallback gracefully
      }
    }
    loadStudent();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userLoggedIn");
    localStorage.removeItem("studentName");
    window.dispatchEvent(new Event("storage"));
    window.location.href = "/";
  };

  // Dedicated routes for each button
  const menuItems = [
    { href: "/student-dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/student-dashboard/mock-test", label: "Mock Tests", icon: FileText },
    { href: "/student-dashboard/free-resources", label: "Free Resources", icon: Sparkles },
    { href: "/student-dashboard/referral", label: "Referral", icon: Gift },
    { href: "/student-dashboard/results", label: "My Results", icon: BarChart2 },
    { href: "/student-dashboard/profile", label: "My Profile", icon: User },
    { href: "/student-dashboard/onlineclasses", label: "Online Classes", icon: Video },
  ];

  return (
    <main className="min-h-screen bg-slate-50 px-2 py-6 sm:px-6 sm:py-8 lg:fixed lg:inset-x-0 lg:bottom-0 lg:top-[var(--site-promo-height)] lg:min-h-0 lg:overflow-hidden lg:px-10 lg:pt-20 lg:pb-4">
      <div className="mx-auto flex max-w-6xl flex-col gap-5 sm:gap-6 lg:h-full">

        {/* TOP BRAND HEADER */}
        <header className="flex shrink-0 items-center justify-between rounded-2xl border border-slate-200 bg-white sm:p-5 shadow-sm lg:py-3 px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm">
              <GraduationCap size={26} />
            </div>
            <div>
              <h1 className="text-base sm:text-lg font-bold text-slate-900 leading-tight">
                Pahal Test
              </h1>
              <p className="text-[10px] sm:text-xs font-semibold tracking-wider text-slate-400 uppercase">
                Online Entrance Prep Platform
              </p>
            </div>
          </div>

          {/* Right Header Icons */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              className="rounded-full p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-800 transition"
              aria-label="Notifications"
            >
              <Bell size={20} />
            </button>

            <div className="flex items-center gap-2 border-l border-slate-200 pl-3">
              <div className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-blue-100 text-blue-600 font-bold">
                <StudentAvatar />
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-sm font-bold text-slate-800 leading-tight">{student.name}</p>
                <p className="text-[10px] text-slate-400">{student.plan}</p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleLogout}
              title="Sign Out"
              className="rounded-full p-2 text-slate-400 hover:bg-red-50 hover:text-red-600 transition"
            >
              <LogOut size={18} />
            </button>
          </div>
        </header>

        {/* MAIN DASHBOARD BODY */}
        <div className="grid grid-cols-1 gap-5 sm:gap-6 lg:min-h-0 lg:flex-1 lg:grid-cols-12 lg:items-stretch">

          {/* LEFT COLUMN: Student Profile & Navigation (4 Cols) */}
          <aside className="flex flex-col gap-4 lg:col-span-4 lg:h-full lg:p-3">
            <div className="rounded-2xl border border-slate-200 bg-white p-3 sm:p-6 shadow-sm">

              {/* Profile Card */}
              <div className="flex flex-col items-center text-center  border-b border-slate-100">
                <div className="flex h-16 w-12 sm:h-20 sm:w-20 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-md">
                  <StudentAvatar />
                </div>
                <h2 className="mt-3 text-base sm:text-lg font-bold text-slate-900">
                  {student.name}
                </h2>
                <p className="text-xs sm:text-sm font-medium text-slate-500">
                  {student.plan}
                </p>
              </div>

              {/* Sidebar Menu Items (Each is a Next.js Link changing the URL) */}
              <nav className="mt-2 " aria-label="Student Navigation">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  // Exact match for dashboard, or startsWith for subroutes
                  const isActive =
                    item.href === "/student-dashboard"
                      ? pathname === "/student-dashboard"
                      : pathname.startsWith(item.href);

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex w-full items-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold transition ${isActive
                        ? "bg-blue-600 text-white shadow-sm"
                        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                        }`}
                    >
                      <Icon size={18} />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}

                {/* Upgrade Button */}
                <div className="pt-3">
                  <div className="flex items-center gap-2.5">
                    <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-50 text-blue-600 ml-3">
                      <Sparkles size={15} />
                    </span>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 ">
                      Upgrade Your Preparation
                    </h3>
                  </div>

                  <Link
                    href="/about"
                    className="mt-3 inline-flex w-full sm:w-auto items-center justify-center rounded-xl bg-blue-600 px-6 py-2.5 ml-3 text-sm font-bold text-white shadow-sm hover:bg-blue-700 transition"
                  >
                    Explore Plans & Upgrade
                  </Link>
                </div>
              </nav>
            </div>
          </aside>

          {/* RIGHT COLUMN: Nested Page Content */}
          <section className="no-scrollbar min-w-0 lg:col-span-8 lg:h-full lg:min-h-0 lg:overflow-y-auto lg:overscroll-contain lg:p-3">
            {children}
          </section>

        </div>

      </div>
    </main>
  );
}
