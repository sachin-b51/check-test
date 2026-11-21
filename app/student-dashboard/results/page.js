"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { BarChart2, Award, CheckCircle, Clock } from "lucide-react";

const apiBaseUrl = (
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"
).replace(/\/$/, "");

export default function ResultsPage() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    async function loadStats() {
      try {
        const res = await fetch(`${apiBaseUrl}/lms/student-dashboard`);
        const data = await res.json();
        if (data.success) {
          setStats(data.stats);
        }
      } catch (err) {
        // Fallback
      }
    }
    loadStats();
  }, []);

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-7 shadow-sm space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
        <div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <BarChart2 size={22} className="text-blue-600" />
            My Test Results & Analytics
          </h2>
          <p className="mt-1 text-xs text-slate-500">
            Performance summary, accuracy metrics, and completed attempt scores.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
        <div className="rounded-xl border border-slate-200 p-4 bg-slate-50">
          <p className="text-xs font-semibold text-slate-500">Total Attempts</p>
          <p className="mt-1.5 text-2xl font-extrabold text-slate-900">
            {stats?.attemptedTests || "08"}
          </p>
          <p className="text-[11px] text-emerald-600 mt-1 font-semibold flex items-center gap-1">
            <CheckCircle size={13} /> Completed Tests
          </p>
        </div>

        {/* <div className="rounded-xl border border-slate-200 p-4 bg-slate-50">
          <p className="text-xs font-semibold text-slate-500">Overall Accuracy</p>
          <p className="mt-1.5 text-2xl font-extrabold text-blue-600">
            {stats?.accuracy || "76%"}
          </p>
          <p className="text-[11px] text-slate-500 mt-1 font-medium">
            Based on completed submissions
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 p-4 bg-slate-50">
          <p className="text-xs font-semibold text-slate-500">All India Rank Track</p>
          <p className="mt-1.5 text-2xl font-extrabold text-amber-600">
            Top 15%
          </p>
          <p className="text-[11px] text-slate-500 mt-1 font-medium flex items-center gap-1">
            <Award size={13} /> Percentile percentile
          </p>
        </div> */}
      </div>

      <div className="rounded-xl border border-slate-200 p-6 text-center">
        <h4 className="text-sm font-bold text-slate-800">
          Ready to take another mock test?
        </h4>
        <p className="text-xs text-slate-500 mt-1">
          Consistent practice improves speed and reduces negative marks in GAT & CAT.
        </p>
        <Link
          href="/student-dashboard/mock-test"
          className="mt-4 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-xs font-bold text-white hover:bg-blue-700 transition"
        >
          Open Mock Test Catalog
        </Link>
      </div>
    </div>
  );
}
