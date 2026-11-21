"use client";

import { useState } from "react";
import {
  ArrowRight,
  BookOpen,
  CalendarDays,
  Clock3,
  FlaskConical,
  Layers3,
  MessageCircleQuestion,
  PlayCircle,
  Video,
  UserRound,
} from "lucide-react";

const classTabs = [
  { id: "my-classes", label: "My Classes", icon: Layers3 },
  { id: "doubt-class", label: "Doubt Class", icon: MessageCircleQuestion },
  { id: "upcoming", label: "Upcoming Classes", icon: CalendarDays },
];

const classes = [
  {
    id: "arithmetic-algebra",
    category: "Quantitative Aptitude",
    title: "Arithmetic & Algebra",
    faculty: "Pahal Faculty",
    date: "Sun, 22 Nov 2026",
    time: "06:30 PM",
    status: "live",
    icon: Layers3,
    kind: "my-classes",
  },
  {
    id: "reading-comprehension",
    category: "Verbal Ability",
    title: "Reading Comprehension",
    faculty: "English Faculty",
    date: "Mon, 23 Nov 2026",
    time: "05:00 PM",
    status: "live",
    icon: BookOpen,
    kind: "my-classes",
  },
  {
    id: "logical-reasoning",
    category: "Reasoning",
    title: "Logical Reasoning",
    faculty: "Pahal Faculty",
    date: "Tue, 24 Nov 2026",
    time: "07:00 PM",
    status: "live",
    icon: MessageCircleQuestion,
    kind: "my-classes",
  },
  {
    id: "basic-chemistry",
    category: "General Science",
    title: "Basic Chemistry",
    faculty: "Science Faculty",
    date: "Wed, 25 Nov 2026",
    time: "06:00 PM",
    status: "live",
    icon: FlaskConical,
    kind: "my-classes",
  },
  {
    id: "accountancy-doubt",
    category: "Accountancy · CUET UG",
    title: "Accountancy Doubt Clearing",
    faculty: "Commerce Faculty",
    date: "Thu, 26 Nov 2026",
    time: "05:30 PM",
    status: "doubt",
    icon: BookOpen,
    kind: "doubt-class",
  },
  {
    id: "design-doubt",
    category: "Design Aptitude · CEED",
    title: "Design & Sketching Doubt Session",
    faculty: "Design Faculty",
    date: "Fri, 27 Nov 2026",
    time: "06:00 PM",
    status: "doubt",
    icon: MessageCircleQuestion,
    kind: "doubt-class",
  },
  {
    id: "gk-upcoming",
    category: "GK & Current Affairs",
    title: "Weekly Current Affairs",
    faculty: "Pahal Faculty",
    date: "Sat, 28 Nov 2026",
    time: "05:00 PM",
    status: "upcoming",
    icon: BookOpen,
    kind: "upcoming",
  },
  {
    id: "uceed-upcoming",
    category: "UCEED · Design Aptitude",
    title: "Spatial Reasoning Practice",
    faculty: "Design Faculty",
    date: "Sun, 29 Nov 2026",
    time: "06:30 PM",
    status: "upcoming",
    icon: Layers3,
    kind: "upcoming",
  },
];

function ClassCard({ onlineClass }) {
  const Icon = onlineClass.icon;
  const actionText =
    onlineClass.status === "live"
      ? "Join Class"
      : onlineClass.status === "doubt"
        ? "Join Doubt Class"
        : "Set Reminder";

  return (
    <article className="rounded-[16px] border border-slate-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex items-start gap-3 sm:gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-700 sm:h-14 sm:w-14">
          <Icon size={22} />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-start justify-between gap-2">
            <div className="min-w-0">
              <span className="inline-flex rounded-md border border-blue-200 bg-blue-50 px-2 py-0.5 text-[10px] font-semibold uppercase text-blue-700">
                {onlineClass.category}
              </span>
              <h2 className="mt-1.5 text-sm font-bold leading-snug text-slate-900 sm:text-base">
                {onlineClass.title}
              </h2>
            </div>
            <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-amber-200 bg-amber-100 px-2 py-1 text-[10px] font-semibold text-amber-500">
              <PlayCircle size={15} />
              {onlineClass.status === "live"
                ? "Live Class"
                : onlineClass.status === "doubt"
                  ? "Doubt Class"
                  : "Upcoming"}
            </span>
          </div>
          <p className="mt-1.5 flex items-center gap-1.5 text-xs text-slate-500">
            <UserRound size={14} className="shrink-0 text-slate-400" />
            <span className="font-semibold text-slate-700">Faculty:</span>
            {onlineClass.faculty}
          </p>
        </div>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-3 border-t border-slate-100 pt-3">
        <span className="inline-flex items-center gap-2 text-xs text-slate-500">
          <CalendarDays size={15} className="text-slate-400" />
          {onlineClass.date}
        </span>
        <span className="hidden h-5 border-l border-slate-200 sm:block" />
        <span className="inline-flex items-center gap-2 text-xs text-slate-500">
          <Clock3 size={15} className="text-slate-400" />
          {onlineClass.time}
        </span>
        <button
          type="button"
          className="ml-auto inline-flex items-center justify-center gap-2 rounded-[10px] bg-blue-600 px-3.5 py-2 text-xs font-semibold text-white transition-colors hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2"
        >
          {actionText}
          <ArrowRight size={16} />
        </button>
      </div>
    </article>
  );
}

export default function OnlineClassesPage() {
  const [activeTab, setActiveTab] = useState("my-classes");
  const filteredClasses = classes.filter(
    (onlineClass) => onlineClass.kind === activeTab
  );

  const description =
    activeTab === "my-classes"
      ? "Your enrolled classes are listed here. Join live sessions, access materials and stay on track."
      : activeTab === "doubt-class"
        ? "Join subject-specific doubt sessions and get help from your faculty."
        : "Plan ahead with your scheduled classes and upcoming learning sessions.";

  return (
    <main className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
      <header className="mb-4 flex items-center gap-3 border-b border-slate-100 pb-3">
        <div>
          <h1 className="flex items-center gap-2 text-xl font-medium text-slate-900">
            <Video size={16} className="text-blue-600" />
            Online Classes
          </h1>
          <p className="mt-1 text-xs text-slate-500">
            Attend live classes, clear your doubts and stay updated with upcoming sessions.
          </p>
        </div>
      </header>

      <div className="mb-4 flex flex-wrap gap-2">
        {classTabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              aria-pressed={isActive}
              className={`inline-flex items-center gap-2 rounded-[10px] border px-3.5 py-2.5 text-xs font-semibold transition-colors sm:text-sm ${
                isActive
                  ? "border-blue-600 bg-blue-600 text-white shadow-sm"
                  : "border-slate-200 bg-slate-50 text-slate-700 hover:border-blue-300 hover:bg-white"
              }`}
            >
              <Icon size={16} />
              {tab.label}
            </button>
          );
        })}
      </div>

      <div
        className="flex items-start gap-2 rounded-[10px] border border-blue-100 bg-blue-50 px-3 py-2.5 text-xs text-blue-700"
        role="status"
      >
        <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-blue-600 text-[10px] font-bold text-white">
          i
        </span>
        <p>{description}</p>
      </div>

      {filteredClasses.length ? (
        <section className="mt-4 grid gap-3 sm:grid-cols-2" aria-live="polite">
          {filteredClasses.map((onlineClass) => (
            <ClassCard key={onlineClass.id} onlineClass={onlineClass} />
          ))}
        </section>
      ) : (
        <section className="mt-4 rounded-[16px] border border-dashed border-slate-300 bg-white px-5 py-10 text-center">
          <CalendarDays className="mx-auto text-slate-400" size={30} />
          <h2 className="mt-3 text-sm font-bold text-slate-900">
            No classes to show yet
          </h2>
          <p className="mt-1 text-xs text-slate-500">
            Classes for this section will appear here when available.
          </p>
        </section>
      )}
    </main>
  );
}
