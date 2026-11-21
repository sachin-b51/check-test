"use client";

import { useEffect, useState } from "react";
import {
  ArrowUpRight,
  BookOpen,
  Check,
  Clock3,
  FileText,
  Lightbulb,
  Share2,
  Sparkles,
} from "lucide-react";

const apiBaseUrl = (
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"
).replace(/\/$/, "");

function getPracticeResources(exams) {
  const resources = [];

  for (const exam of exams) {
    const examName = exam.name || "Entrance Exam";
    const normalizedExam = examName.toLowerCase();

    for (const subject of exam.subjects || []) {
      const subjectName = subject.name || "General";
      const normalizedSubject = subjectName.toLowerCase();

      if (
        /ceed|uceed|nid|nift/.test(normalizedExam) ||
        /design|creative|sketch|drawing/.test(normalizedSubject)
      ) {
        resources.push({
          id: `${exam.id}-${subject.id}-design`,
          category: `${examName} · ${subjectName}`,
          title: "Daily drawing and observation prompt",
          description:
            "Sketch a familiar object from three viewpoints. Show its proportions, construction details, and how a person would use it.",
          duration: "30–45 mins",
          icon: Lightbulb,
        });
      }

      if (/accountancy|accounting/.test(normalizedSubject)) {
        resources.push({
          id: `${exam.id}-${subject.id}-accountancy`,
          category: `${examName} · ${subjectName}`,
          title: "Accountancy quick-revision drill",
          description:
            "Practise one partnership adjustment and one financial-ratio question, then check each calculation step against your notes.",
          duration: "20 mins",
          icon: BookOpen,
        });
      }

      if (/current affairs|general knowledge|\bgk\b/.test(normalizedSubject)) {
        resources.push({
          id: `${exam.id}-${subject.id}-gk`,
          category: `${examName} · ${subjectName}`,
          title: "Current affairs recall",
          description:
            "Choose five recent national or international headlines. Summarize each in one sentence and recall its key people, place, and date.",
          duration: "15 mins",
          icon: BookOpen,
        });
      }

      if (/business studies|economics|history|english/.test(normalizedSubject)) {
        resources.push({
          id: `${exam.id}-${subject.id}-revision`,
          category: `${examName} · ${subjectName}`,
          title: `${subjectName} active-recall practice`,
          description: `Pick one topic from ${subjectName}, write five questions from memory, and answer them without looking at your notes.`,
          duration: "20 mins",
          icon: FileText,
        });
      }
    }
  }

  return resources.slice(0, 4);
}

function collectPaperResources(exams) {
  return exams.flatMap((exam) =>
    (exam.subjects || []).flatMap((subject) =>
      (subject.classifications || []).flatMap((classification) =>
        (classification.papers || [])
          .filter((paper) => paper.fileUrl || paper.testUrl)
          .map((paper) => ({
            ...paper,
            examName: exam.name,
            subjectName: subject.name,
            classificationName: classification.name,
          }))
      )
    )
  )
    .sort((first, second) => {
      const firstIsPyq = first.format === "PYQ" ? 1 : 0;
      const secondIsPyq = second.format === "PYQ" ? 1 : 0;
      return secondIsPyq - firstIsPyq;
    })
    .slice(0, 4);
}

function ResourceCard({ resource, onShare, copied }) {
  return (
    <article className="rounded-xl border border-slate-300 bg-white p-3.5 transition-shadow hover:shadow-sm">
      <div className="flex items-start gap-3">
        <div className="min-w-0 flex-1">
          <div className="mb-1.5 flex flex-wrap gap-1.5">
            {[resource.examName, resource.subjectName, resource.year || resource.format]
              .filter(Boolean)
              .map((tag) => (
                <span
                  key={tag}
                  className="rounded border border-emerald-100 bg-emerald-50 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wide text-emerald-700"
                >
                  {tag}
                </span>
              ))}
          </div>
          <h3 className="text-sm font-bold leading-snug text-slate-900">
            {resource.title}
          </h3>
          {resource.description && (
            <p className="mt-1 text-xs leading-5 text-slate-600">
              {resource.description}
            </p>
          )}
          <p className="mt-1 text-[10px] text-slate-500">
            {[resource.classificationName, resource.scope, resource.year]
              .filter(Boolean)
              .join(" · ")}
          </p>
        </div>
        <button
          type="button"
          onClick={() => onShare(resource)}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition-colors hover:bg-blue-50 hover:text-blue-700"
          aria-label={`Share ${resource.title}`}
          title="Share resource"
        >
          <Share2 size={17} />
        </button>
      </div>

      <div className="mt-3 flex flex-wrap gap-2 border-t border-slate-100 pt-3">
        {resource.fileUrl && (
          <a
            href={resource.fileUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700 transition-colors hover:border-blue-300 hover:text-blue-700"
          >
            <FileText size={14} />
            View paper
            <ArrowUpRight size={13} />
          </a>
        )}
        {resource.testUrl && (
          <a
            href={`/resgister?paperId=${encodeURIComponent(resource.id)}`}
            className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-3 py-2 text-xs font-semibold text-white transition-colors hover:bg-blue-700"
          >
            Open practice test
            <ArrowUpRight size={13} />
          </a>
        )}
        {copied && (
          <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-700" role="status">
            <Check size={14} />
            Link copied
          </span>
        )}
      </div>
    </article>
  );
}

export default function FreeResourcesPage() {
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [copiedResourceId, setCopiedResourceId] = useState(null);
  const [shareMessage, setShareMessage] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function loadResources() {
      try {
        const response = await fetch(`${apiBaseUrl}/lms/test-series`, {
          signal: controller.signal,
        });
        const payload = await response.json();

        if (!response.ok || !payload.success || !Array.isArray(payload.exams)) {
          throw new Error(payload.message || "Resources could not be loaded.");
        }

        setExams(payload.exams);
      } catch (loadError) {
        if (loadError.name !== "AbortError") {
          setError(loadError.message || "Resources could not be loaded.");
        }
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }

    loadResources();
    return () => controller.abort();
  }, []);

  const paperResources = collectPaperResources(exams);
  const practiceResources = getPracticeResources(exams);

  async function shareResource(resource) {
    const url = new URL(
      resource.testUrl
        ? `/resgister?paperId=${encodeURIComponent(resource.id)}`
        : resource.fileUrl,
      window.location.origin
    ).toString();

    try {
      if (navigator.share) {
        try {
          await navigator.share({ title: resource.title, url });
          setShareMessage("");
          return;
        } catch (shareError) {
          if (shareError.name === "AbortError") return;
        }
      }

      if (!navigator.clipboard?.writeText) {
        throw new Error("Sharing or clipboard access is not available.");
      }
      await navigator.clipboard.writeText(url);
      setCopiedResourceId(resource.id);
      setShareMessage("");
      window.setTimeout(() => setCopiedResourceId(null), 2500);
    } catch (shareError) {
      setShareMessage(shareError.message || "Could not share this resource.");
    }
  }

  async function sharePage() {
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({
          title: "Free Exam Preparation Resources",
          url,
        });
        setShareMessage("");
        return;
      }

      if (!navigator.clipboard?.writeText) {
        throw new Error("Sharing or clipboard access is not available.");
      }
      await navigator.clipboard.writeText(url);
      setShareMessage("Page link copied.");
    } catch (shareError) {
      if (shareError.name !== "AbortError") {
        setShareMessage(shareError.message || "Could not share this page.");
      }
    }
  }

  return (
    <main className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
      <header className="mb-5 flex flex-wrap items-start justify-between gap-3 border-b border-slate-100 pb-4">
        <div className="flex gap-3">
          <span className="mt-0.5 flex h-8 w-1 shrink-0 rounded-full bg-blue-600" />
          <div>
            <h1 className="flex items-center gap-2 text-lg font-extrabold text-slate-900 sm:text-xl">
              <Sparkles size={19} className="text-amber-500" />
              Free Open Resources
            </h1>
            <p className="mt-1 text-xs leading-5 text-slate-500 sm:text-sm">
              Practice resources matched to our exams, subjects, and published test papers.
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={sharePage}
          className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600 transition-colors hover:bg-slate-50 hover:text-blue-700"
        >
          <Share2 size={15} />
          Share
        </button>
      </header>

      {shareMessage && (
        <p className="mb-4 text-xs text-slate-600" role="status">
          {shareMessage}
        </p>
      )}

      {error ? (
        <section className="rounded-xl border border-red-200 bg-red-50 p-4" role="alert">
          <h2 className="text-sm font-bold text-red-800">Could not load resources</h2>
          <p className="mt-1 text-xs text-red-700">{error}</p>
        </section>
      ) : (
        <div className="grid gap-6 lg:grid-cols-2">
          <section aria-labelledby="paper-resources-title">
            <h2
              id="paper-resources-title"
              className="mb-3 border-b border-slate-200 pb-2 text-xs font-extrabold uppercase tracking-wide text-slate-800"
            >
              Previous papers & test resources
            </h2>
            {loading ? (
              <p className="text-sm text-slate-500" role="status">
                Loading exam resources…
              </p>
            ) : paperResources.length ? (
              <div className="space-y-2.5">
                {paperResources.map((resource) => (
                  <ResourceCard
                    key={resource.id}
                    resource={resource}
                    onShare={shareResource}
                    copied={copiedResourceId === resource.id}
                  />
                ))}
              </div>
            ) : (
              <div className="rounded-xl border border-dashed border-slate-300 p-4 text-sm text-slate-500">
                No published papers or test links are available yet. Check the Mock Tests page for updates.
              </div>
            )}
          </section>

          <section aria-labelledby="practice-resources-title">
            <h2
              id="practice-resources-title"
              className="mb-3 border-b border-slate-200 pb-2 text-xs font-extrabold uppercase tracking-wide text-slate-800"
            >
              Practice by exam & subject
            </h2>
            {loading ? (
              <p className="text-sm text-slate-500" role="status">
                Preparing subject practice ideas…
              </p>
            ) : practiceResources.length ? (
              <div className="space-y-3">
                {practiceResources.map((resource) => {
                  const Icon = resource.icon;
                  return (
                    <article
                      key={resource.id}
                      className="rounded-xl border border-slate-300 bg-white p-4"
                    >
                      <p className="text-[10px] font-bold uppercase tracking-wide text-blue-600">
                        {resource.category}
                      </p>
                      <h3 className="mt-2 flex items-center gap-2 text-sm font-bold text-slate-900">
                        <Icon size={16} className="text-blue-600" />
                        {resource.title}
                      </h3>
                      <p className="mt-2 text-xs leading-5 text-slate-600">
                        {resource.description}
                      </p>
                      <div className="mt-3 flex items-center gap-1.5 border-t border-slate-100 pt-3 text-[10px] text-slate-500">
                        <Clock3 size={13} />
                        Suggested time: {resource.duration}
                      </div>
                    </article>
                  );
                })}
              </div>
            ) : (
              <div className="rounded-xl border border-dashed border-slate-300 p-4 text-sm text-slate-500">
                Subject-based practice prompts will appear when published exams are available.
              </div>
            )}
          </section>
        </div>
      )}
    </main>
  );
}
