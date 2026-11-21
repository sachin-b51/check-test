
"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function Back() {
  return (
    <div className="w-full bg-slate-50 pt-18 sm:pt-20 lg:pt-25">
      <div className="mx-auto w-full max-w-[1280px] px-3 sm:px-4">
        <div className="flex w-full items-center justify-between rounded-[16px] sm:rounded-[20px] border border-slate-200 bg-white px-3 sm:px-6 md:px-7 py-2.5 sm:py-3 shadow-sm">

          {/* Back to Home */}
          <Link
            href="/"
            className="flex items-center gap-1.5 sm:gap-2 md:gap-3 text-xs sm:text-[14px] md:text-[15px] font-semibold text-slate-600 transition-colors hover:text-blue-600"
          >
            <ArrowLeft size={16} className="shrink-0 sm:size-[18px]" />
            <span>Back to Home</span>
          </Link>

          {/* All Entrance Mock Tests */}
          <div className="flex items-center gap-1 sm:gap-1.5 md:gap-2 text-[10px] sm:text-[11px] md:text-xs font-semibold uppercase tracking-wide text-slate-500">
            <span>📝</span>
            <span className="truncate max-w-[150px] sm:max-w-none">All Entrance Mock Tests</span>
          </div>

        </div>
      </div>
    </div>
  );
}
