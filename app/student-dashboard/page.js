"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  CheckCircle,
  FileSpreadsheet,
  BookOpen,
  Target,
  ArrowRight,
  ExternalLink,
} from "lucide-react";

const apiBaseUrl = (
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"
).replace(/\/$/, "");

export default function StudentDashboardPage() {
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState(null);

  useEffect(() => {
    async function loadStats() {
      try {
        setLoading(true);
        const res = await fetch(`${apiBaseUrl}/lms/student-dashboard`);
        const data = await res.json();
        if (data.success) {
          setDashboardData(data);
        }
      } catch (err) {
        // Fallback gracefully
      } finally {
        setLoading(false);
      }
    }
    loadStats();
  }, []);

  const statsData = dashboardData?.stats || {
    availableMocks: 24,
    attemptedTests: "08",
    studyMaterials: 57,
    accuracy: "76%",
  };

  const currentMock = dashboardData?.currentMock || {
    exam: "CUET UG",
    testName: "Mock Test 02",
    progress: 60,
    testUrl: null,
  };

  const statCards = [
    {
      id: 1,
      title: "Available mocks",
      value: statsData.availableMocks,
      icon: FileSpreadsheet,
      color: "text-blue-600",
    },
    {
      id: 2,
      title: "Attempted tests",
      value: statsData.attemptedTests,
      icon: CheckCircle,
      color: "text-emerald-600",
    },
    {
      id: 3,
      title: "Study materials",
      value: statsData.studyMaterials,
      icon: BookOpen,
      color: "text-indigo-600",
    },
    {
      id: 4,
      title: "Accuracy",
      value: statsData.accuracy,
      icon: Target,
      color: "text-orange-600",
    },
  ];

  return (
    <div className="space-y-5 sm:space-y-6">
      {/* Welcome & Stats Container */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-7 shadow-sm">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2">
            Welcome back!
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-slate-500 font-medium">
            Your preparation at a glance.
          </p>
        </div>

        {/* Stats Grid: 2 columns matching design */}
        <div className="mt-5 sm:mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          {statCards.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.id}
                className="rounded-xl border border-slate-200 bg-white p-4 sm:p-5 transition hover:border-slate-300"
              >
                <p className="text-xs sm:text-sm font-semibold text-slate-500">
                  {stat.title}
                </p>
                <p className="mt-2 text-2xl sm:text-3xl font-extrabold text-slate-900">
                  {loading ? "..." : stat.value}
                </p>
                <div className="mt-3">
                  <Icon size={18} className={stat.color} />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Continue Preparation Card */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm">
        <h3 className="text-base sm:text-lg font-bold text-slate-900">
          Continue Preparation
        </h3>

        <p className="mt-2 text-xs sm:text-sm font-semibold text-slate-600">
          {currentMock.exam} — {currentMock.testName}
        </p>

        {/* Progress Bar */}
        <div className="mt-3 h-2 w-full rounded-full bg-slate-100 overflow-hidden">
          <div
            className="h-full bg-blue-600 rounded-full transition-all duration-300"
            style={{ width: `${currentMock.progress}%` }}
          />
        </div>

        {/* Action Button */}
        {currentMock.testUrl ? (
          <a
            href={currentMock.testUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-4 sm:mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 text-sm font-bold text-white shadow-sm hover:bg-blue-700 transition"
          >
            <span>Resume Test</span>
            <ArrowRight size={16} />
          </a>
        ) : (
          <Link
            href="/student-dashboard/mock-test"
            className="mt-4 sm:mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 text-sm font-bold text-white shadow-sm hover:bg-blue-700 transition"
          >
            <span>Resume Test</span>
            <ArrowRight size={16} />
          </Link>
        )}
      </div>
    </div>
  );
}
