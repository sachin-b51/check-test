"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

const KEY = "pd-theme";

function readTheme() {
  try {
    const saved = localStorage.getItem(KEY);
    if (saved === "dark" || saved === "light") return saved;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  } catch (e) {
    return "light";
  }
}

export default function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    const sync = () => setDark(root.dataset.theme === "dark");
    root.dataset.theme = readTheme();
    sync();
    window.addEventListener("pd-themechange", sync);
    return () => window.removeEventListener("pd-themechange", sync);
  }, []);

  const toggle = () => {
    const root = document.documentElement;
    const next = dark ? "light" : "dark";
    root.dataset.theme = next;
    setDark(next === "dark");
    try {
      localStorage.setItem(KEY, next);
    } catch (err) {}
    window.dispatchEvent(new Event("pd-themechange"));
  };

  return (
    <button
      type="button"
      className="pd-tt"
      onClick={toggle}
      aria-pressed={dark}
      aria-label={dark ? "Switch to light theme" : "Switch to dark theme"}
      title="Light / Dark"
    >
      <span className="pd-tt-thumb" aria-hidden="true">
        <Sun className="pd-tt-sun" size={14} />
        <Moon className="pd-tt-moon" size={14} />
      </span>
    </button>
  );
}
