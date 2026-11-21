import { Suspense } from "react";
import ExamClient from "./ExamClient";

export default async function ExamPage({ searchParams }) {
  const { paperId } = (await searchParams) || {};

  return (
    <Suspense
      fallback={
        <main className="mt-16 flex min-h-[calc(100vh-4rem)] items-center justify-center bg-slate-100 px-4">
          <p role="status" className="text-slate-600">Loading exam...</p>
        </main>
      }
    >
      <ExamClient paperId={paperId || null} />
    </Suspense>
  );
}
