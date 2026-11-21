"use client";

import { Suspense } from "react";
import MockTestCatalog from "../../components/MockTestCatalog";

export default function MockTestPage() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-6 shadow-sm">

      <div className="mb-4 pb-3 border-b border-slate-100 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-900">
            Mock Tests
          </h2>

          <p className="text-xs text-slate-500">
            Browse and practice full mock tests and previous year papers.
          </p>
        </div>
      </div>

      <Suspense fallback={null}>
        <MockTestCatalog embedded />
      </Suspense>

    </div>
  );
}