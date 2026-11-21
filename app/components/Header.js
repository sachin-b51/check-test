"use client";

import { useState, useEffect } from "react";
import {
  Menu,
  X,
  FileText,
  Lock,
  Sparkles,
  User,
  Phone,
  MonitorPlay,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import LoginPage from "../LoginPage/page";

const apiBaseUrl = (
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"
).replace(/\/$/, "");

function Header() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobileMockTestsOpen, setMobileMockTestsOpen] = useState(false);
  const [mobileResourcesOpen, setMobileResourcesOpen] = useState(false);
  const [dbExams, setDbExams] = useState([]);
  const [totalTestsCount, setTotalTestsCount] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [studentName, setStudentName] = useState("");

  // Sync login status from localStorage and storage events
  useEffect(() => {
    function checkLoginStatus() {
      const loggedIn = typeof window !== "undefined" && localStorage.getItem("userLoggedIn") === "true";
      const name = typeof window !== "undefined" ? localStorage.getItem("studentName") || "Student" : "Student";
      setIsLoggedIn(loggedIn);
      setStudentName(name);
    }

    checkLoginStatus();
    window.addEventListener("storage", checkLoginStatus);
    return () => window.removeEventListener("storage", checkLoginStatus);
  }, []);

  useEffect(() => {
    async function fetchExams() {
      try {
        const res = await fetch(`${apiBaseUrl}/lms/test-series`);
        const data = await res.json();
        if (data.success && Array.isArray(data.exams)) {
          setDbExams(data.exams);
          const total = data.exams.reduce((acc, exam) => {
            const examPapers = (exam.subjects || []).reduce((sAcc, sub) => {
              return sAcc + (sub.classifications || []).reduce((cAcc, cl) => {
                return cAcc + (cl.papers?.length > 0 ? cl.papers.length : (cl.count || 0));
              }, 0);
            }, 0);
            return acc + examPapers;
          }, 0);
          setTotalTestsCount(total);
        }
      } catch (err) {
        // Fallback gracefully
      }
    }
    fetchExams();
  }, []);

  const openLogin = () => {
    setIsMobileMenuOpen(false);
    setIsLoginOpen(true);
  };
  const closeLogin = () => setIsLoginOpen(false);

  const moveDashboardButton = (event) => {
    if (
      event.pointerType === "touch" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const button = event.currentTarget;
    const bounds = button.getBoundingClientRect();
    const x = Math.max(-8, Math.min(8, (event.clientX - (bounds.left + bounds.width / 2)) * 0.12));
    const y = Math.max(-6, Math.min(6, (event.clientY - (bounds.top + bounds.height / 2)) * 0.12));
    button.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  };

  const resetDashboardButton = (event) => {
    event.currentTarget.style.transform = "";
  };

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      <div className="site-promo overflow-hidden bg-gradient-to-r from-red-700 via-red-500 to-rose-700 text-white shadow-lg  ">
        <div className="site-promo-inner flex justify-between">
          <div className="site-promo-copy">
            <h2 className="tracking-tight">Your Competition Is Practising. Are You?</h2>
            
          </div>
          <Link className="site-promo-cta transition hover:-translate-y-0.5 hover:bg-amber-100 focus-visible:outline focus-visible:outline-2 w-45 focus-visible:outline-offset-2 focus-visible:outline-white" href="/mock-test">
            PRACTICE NOW <ArrowRight size={14} aria-hidden="true" />
          </Link>
        </div>
      </div>

      <nav className="site-nav fixed left-0 right-0 z-50 w-full border-b border-white/40 bg-gradient-to-b from-white/25 via-white/30 to-white/35 shadow-[0_4px_20px_rgba(15,23,42,0.06)] backdrop-blur-lg backdrop-saturate-110 transition-all duration-300">
        <div className="mx-auto w-full max-w-[1520px] px-4 sm:px-6 lg:px-10">
          <div className="grid h-[72px] grid-cols-[1fr_auto_1fr] items-center">

            {/* Left: Brand Logo */}
            <Link href="/" className="flex shrink-0 items-center gap-3 no-underline group">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-600 text-lg font-black text-white shadow-sm transition-transform group-hover:scale-105">
                PD
              </div>

              <div className="flex flex-col leading-tight">
                <span className="text-[17px] font-bold text-slate-900 tracking-tight">
                  Pahal Design

                </span>
                <span className=" h-[2px] w-full rounded-full bg-blue-600"></span>
                <span className="text-[12px] font-bold text-slate-500 tracking-normal">
                  Online Test Series
                </span>
              </div>
            </Link>

            {/* Desktop Navigation (Matching Screenshot) */}
            <div className="hidden lg:col-start-2 lg:flex items-center justify-center gap-5 xl:gap-8 text-[15px] font-medium text-slate-600 font-semibold">

              {/* Home */}
              <Link
                href="/"
                className="transition-colors hover:text-blue-600 py-2"
              >
                Home
              </Link>

              {/* About */}
              <Link
                href="/about"
                className="transition-colors hover:text-blue-600 py-2"
              >
                About
              </Link>

              {/* Mock Tests (With Dropdown) */}
              <div className="group relative">
                <Link
                  href="/mock-test"
                  className="flex items-center py-5 transition-colors hover:text-blue-600 relative "
                >
                  Mock Tests
                </Link>

                <div className="absolute left-1/2 -translate-x-1/2 top-full z-50 hidden w-[270px] overflow-hidden rounded-2xl border border-slate-100 bg-white p-2 shadow-xl shadow-slate-200/50 group-hover:block">
                  <Link
                    href="/mock-test"
                    className="flex items-center justify-between rounded-xl px-3 py-2 text-[13px] font-bold text-slate-800 hover:bg-blue-50"
                  >
                    <span className="flex items-center gap-2">
                      <FileText size={14} className="text-blue-600" />
                      <span>All Mock Tests</span>
                    </span>
                    <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] text-slate-600">
                      {totalTestsCount || 437}
                    </span>
                  </Link>

                  <div className="my-1 border-t border-slate-100" />
                  <p className="px-3 py-1 text-[11px] font-bold tracking-wider uppercase text-slate-400">
                    Exam Categories
                  </p>

                  {(dbExams.length > 0
                    ? dbExams.map((e) => ({
                      name: `${e.name} Mocks`,
                      examName: e.name,
                      count:
                        (e.subjects || []).reduce(
                          (sAcc, sub) =>
                            sAcc +
                            (sub.classifications || []).reduce(
                              (cAcc, cl) =>
                                cAcc +
                                (cl.papers?.length > 0 ? cl.papers.length : (cl.count || 0)),
                              0
                            ),
                          0
                        ) || e.count || 0,
                    }))
                    : [
                      { name: "CEED Mocks", examName: "CEED", count: 9 },
                      { name: "CUET UG Mocks", examName: "CUET UG", count: 356 },
                      { name: "GK & Current Affairs Mocks", examName: "GK & Current Affairs", count: 43 },
                      { name: "NID Mocks", examName: "NID", count: 2 },
                      { name: "NIFT Mocks", examName: "NIFT", count: 14 },
                      { name: "UCEED Mocks", examName: "UCEED", count: 13 },
                    ]
                  ).map((item) => (
                    <Link
                      key={item.name}
                      href={`/mock-test?exam=${encodeURIComponent(item.examName)}`}
                      className="flex items-center justify-between rounded-lg px-3 py-1.5 text-[14px] font-semibold text-slate-700 hover:bg-blue-50 hover:text-blue-600"
                    >
                      <span>{item.name}</span>
                      <span className="rounded-full bg-blue-50 px-2.5 py-1 text-[11px] font-bold text-blue-600">
                        {item.count}
                      </span>
                    </Link>
                  ))}

                  <div className="my-1 border-t border-slate-100" />
                  <a
                    href="/mock-test#previous-year-papers"
                    className="flex items-center justify-between rounded-lg px-3 py-1.5 text-[13px] font-bold text-amber-700 hover:bg-amber-50"
                  >
                    <span>Prev. Year Paper (PYQ)</span>
                    <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[10px]">
                      PYQ
                    </span>
                  </a>
                </div>
              </div>

              {/* Study Resources (With Dropdown) */}
              <div className="group relative">
                <Link
                  href="/student-dashboard/free-resources"
                  className="flex items-center py-5 transition-colors hover:text-blue-600"
                >
                  Study Resources
                </Link>

                <div className="absolute left-1/2 -translate-x-1/2 top-full z-50 hidden w-[260px] overflow-hidden rounded-2xl border border-slate-100 bg-white p-2 shadow-xl shadow-slate-200/50 group-hover:block">
                  <button
                    type="button"
                    onClick={openLogin}
                    className="flex w-full items-center gap-3 rounded-xl p-2.5 text-left hover:bg-blue-50"
                  >
                    <span className="shrink-0 rounded-lg bg-blue-50 p-2 text-blue-500">
                      <Lock size={14} />
                    </span>
                    <div>
                      <span className="block text-[14px] font-bold text-slate-800">
                        Paid Membership
                      </span>
                      <span className="block text-[12px] text-slate-400">
                        Premium Notes &amp; solved guides
                      </span>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={openLogin}
                    className="flex w-full items-center gap-3 rounded-xl p-2.5 text-left hover:bg-amber-50/60"
                  >
                    <span className="shrink-0 rounded-lg bg-amber-50 p-2 text-amber-500">
                      <Sparkles size={14} />
                    </span>
                    <div>
                      <span className="block text-[14px] font-bold text-slate-800">
                        Study Material
                      </span>
                      <span className="block text-[12px] text-slate-400">
                        Open Access Seats &amp; Syllabus
                      </span>
                    </div>
                  </button>
                </div>
              </div>

              {/* Online Classes */}
              <button
                type="button"
                onClick={openLogin}
                className="transition-colors hover:text-blue-600 py-2 cursor-pointer"
              >
                Online Classes
              </button>

              {/* Contact */}
              <Link
                href="/contact"
                className="transition-colors hover:text-blue-600 py-2"
              >
                Contact
              </Link>

            </div>

            {/* Right: Theme Toggle + Student / Guest Actions */}
            <div className="hidden lg:col-start-3 lg:flex items-center justify-end gap-3">
              {isLoggedIn ? (
                <>
                  <ThemeToggle />
                  <Link
                    href="/student-dashboard"
                    onPointerMove={moveDashboardButton}
                    onPointerLeave={resetDashboardButton}
                    onPointerCancel={resetDashboardButton}
                    className="inline-flex items-center gap-2 whitespace-nowrap rounded-2xl bg-blue-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-blue-700 will-change-transform"
                  >
                    <User size={18} />
                    <span>Dashboard ({studentName || "Student"})</span>
                  </Link>
                </>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={openLogin}
                    className="whitespace-nowrap py-2 font-medium text-slate-700 transition-colors hover:text-blue-600 cursor-pointer"
                  >
                    Sign In
                  </button>
                  <ThemeToggle />
                  <button
                    type="button"
                    onClick={openLogin}
                    className="inline-flex items-center justify-center whitespace-nowrap rounded-2xl bg-blue-600 px-5 py-2.5 text-[14px] font-semibold text-white shadow-sm shadow-blue-600/30 transition-all hover:bg-blue-700 hover:shadow-md cursor-pointer"
                  >
                    Create Account
                  </button>
                </>
              )}
            </div>

            {/* Mobile / Tablet Controls (< lg) */}
            <div className="col-start-3 flex items-center justify-self-end gap-3 lg:hidden">
              <ThemeToggle />

              {!isLoggedIn && (
                <button
                  type="button"
                  onClick={openLogin}
                  className="hidden sm:inline-flex items-center rounded-xl bg-blue-600 px-3.5 py-2 text-xs font-bold text-white shadow-sm transition hover:bg-blue-700"
                >
                  Create Account
                </button>
              )}

              {/* Hamburger Button */}
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
                aria-expanded={isMobileMenuOpen}
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:bg-slate-50 focus:outline-none"
              >
                {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>

          </div>
        </div>
      </nav>

      {/* Mobile Drawer Backdrop */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/60 backdrop-blur-sm transition-opacity lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile Drawer */}
      <div
        className={`site-drawer fixed bottom-0 right-0 top-0 z-50 flex w-full max-w-[340px] flex-col bg-white shadow-2xl transition-transform duration-300 ease-in-out lg:hidden ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
      >
        <div className="flex h-[72px] items-center justify-between border-b border-slate-100 px-5">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-sm font-black text-white">
              PD
            </div>
            <span className="font-bold text-slate-900">Pahal Design</span>
          </div>

          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(false)}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-1 text-sm font-medium">
          <Link
            href="/"
            onClick={() => setIsMobileMenuOpen(false)}
            className="flex items-center gap-3 rounded-xl px-4 py-3 text-slate-700 hover:bg-blue-50 hover:text-blue-600 transition"
          >
            Home
          </Link>

          <Link
            href="/about"
            onClick={() => setIsMobileMenuOpen(false)}
            className="flex items-center gap-3 rounded-xl px-4 py-3 text-slate-700 hover:bg-blue-50 hover:text-blue-600 transition"
          >
            About
          </Link>

          <Link
            href="/mock-test"
            onClick={() => setIsMobileMenuOpen(false)}
            className="flex items-center justify-between rounded-xl px-4 py-3 text-slate-700 hover:bg-blue-50 hover:text-blue-600 transition"
          >
            <span>Mock Tests</span>
            <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-600">
              {totalTestsCount || 437}
            </span>
          </Link>

          <Link
            href="/student-dashboard/free-resources"
            onClick={() => setIsMobileMenuOpen(false)}
            className="flex items-center gap-3 rounded-xl px-4 py-3 text-slate-700 hover:bg-blue-50 hover:text-blue-600 transition"
          >
            Study Resources
          </Link>

          <button
            type="button"
            onClick={openLogin}
            className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-slate-700 hover:bg-blue-50 hover:text-blue-600 transition text-left"
          >
            Online Classes
          </button>

          <Link
            href="/contact"
            onClick={() => setIsMobileMenuOpen(false)}
            className="flex items-center gap-3 rounded-xl px-4 py-3 text-slate-700 hover:bg-blue-50 hover:text-blue-600 transition"
          >
            Contact
          </Link>
        </div>

        <div className="border-t border-slate-100 p-4 space-y-3 bg-slate-50/70">
          {isLoggedIn ? (
            <Link
              href="/student-dashboard"
              onClick={() => setIsMobileMenuOpen(false)}
              onPointerMove={moveDashboardButton}
              onPointerLeave={resetDashboardButton}
              onPointerCancel={resetDashboardButton}
              className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-blue-600 text-xs font-bold text-white shadow-sm transition hover:bg-blue-700 will-change-transform"
            >
              <User size={16} />
              <span>Go to Student Dashboard</span>
            </Link>
          ) : (
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={openLogin}
                className="flex h-11 items-center justify-center rounded-xl border border-slate-300 bg-white text-xs font-bold text-slate-700 shadow-sm transition hover:bg-slate-50"
              >
                Sign In
              </button>

              <button
                type="button"
                onClick={openLogin}
                className="flex h-11 items-center justify-center rounded-xl bg-blue-600 text-xs font-bold text-white shadow-sm transition hover:bg-blue-700"
              >
                Create Account
              </button>
            </div>
          )}

          <a
            href="https://wa.me/918750591056"
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-2 rounded-xl bg-emerald-50 py-2.5 text-xs font-bold text-emerald-700 hover:bg-emerald-100 transition"
          >
            <Phone size={14} />
            <span>WhatsApp +91 8750591056</span>
          </a>
        </div>
      </div>

      {/* Login Modal */}
      <LoginPage
        isOpen={isLoginOpen}
        onClose={closeLogin}
        onLoginSuccess={() => {
          setIsLoggedIn(true);
          const name = typeof window !== "undefined" ? localStorage.getItem("studentName") || "Student" : "Student";
          setStudentName(name);
        }}
      />
    </>
  );
}

export default Header;
