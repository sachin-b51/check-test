
"use client";
import { useEffect, useRef, useState } from "react";

const apiBaseUrl = (
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"
).replace(/\/$/, "");

// Reusable filter card
function FilterCard({
  active,
  title,
  count,
  subtitle,
  onClick,
  upcoming,
}) {
  const cardRef = useRef(null);
  const spotlightRef = useRef(null);

  useEffect(() => {
    const card = cardRef.current;
    const spotlight = spotlightRef.current;
    const supportsPointerHover = window.matchMedia(
      "(hover: hover) and (pointer: fine)"
    ).matches;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (!card || !spotlight || !supportsPointerHover || prefersReducedMotion) {
      return;
    }

    function handlePointerEnter(event) {
      if (event.pointerType !== "mouse") return;
      card.style.transition =
        "transform 500ms cubic-bezier(0.2, 0.7, 0.2, 1), box-shadow 250ms ease";
      spotlight.style.transition = "opacity 250ms ease";
      spotlight.style.opacity = "1";
    }

    function handlePointerMove(event) {
      if (event.pointerType !== "mouse") return;
      const bounds = card.getBoundingClientRect();
      const x = (event.clientX - bounds.left) / bounds.width;
      const y = (event.clientY - bounds.top) / bounds.height;
      const rotateY = (x - 0.5) * 24;
      const rotateX = (0.5 - y) * 24;

      card.style.transition = "transform 80ms ease-out, box-shadow 200ms ease";
      card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(12px) scale(1.02)`;
      card.style.boxShadow = active
        ? "0 16px 30px rgba(37, 99, 235, 0.28), 0 0 24px rgba(59, 130, 246, 0.2)"
        : "0 16px 30px rgba(15, 23, 42, 0.16), 0 0 24px rgba(59, 130, 246, 0.16)";
      spotlight.style.background = `radial-gradient(circle at ${x * 100}% ${y * 100}%, rgba(96, 165, 250, 0.28), transparent 68%)`;
    }

    function handlePointerLeave() {
      card.style.transition =
        "transform 500ms cubic-bezier(0.2, 0.7, 0.2, 1), box-shadow 300ms ease";
      card.style.transform =
        "perspective(900px) rotateX(0deg) rotateY(0deg) translateZ(0) scale(1)";
      card.style.boxShadow = active
        ? "0 4px 12px rgba(37, 99, 235, 0.2), 0 0 18px rgba(59, 130, 246, 0.12)"
        : "";
      spotlight.style.transition = "opacity 300ms ease";
      spotlight.style.opacity = "0";
    }

    card.addEventListener("pointerenter", handlePointerEnter);
    card.addEventListener("pointermove", handlePointerMove);
    card.addEventListener("pointerleave", handlePointerLeave);

    return () => {
      card.removeEventListener("pointerenter", handlePointerEnter);
      card.removeEventListener("pointermove", handlePointerMove);
      card.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, [active]);

  return (
    <button
      ref={cardRef}
      type="button"
      onClick={onClick}
      aria-pressed={active}
      data-selected={active}
      style={{
        background: active ? "#2563eb" : "#f8fafc",
        border: `1px solid ${active ? "#2563eb" : "#e2e8f0"}`,
        color: active ? "#ffffff" : "#0f172a",
        transformStyle: "preserve-3d",
        willChange: "transform",
      }}
      className={`group relative flex h-[68px] sm:h-[72px] lg:h-[76px] w-[140px] sm:w-[155px] lg:w-[170px] shrink-0 flex-col justify-between rounded-[13px] sm:rounded-[14px] lg:rounded-[15px] border p-2 sm:p-2.5 lg:px-3 lg:py-2.5 text-left outline-none transition-shadow duration-200 motion-reduce:transition-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 ${active
        ? "shadow-md ring-2 ring-blue-200 hover:shadow-lg"
        : "hover:border-blue-300 hover:shadow-md"
        }`}
    >
      <span
        ref={spotlightRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 rounded-[inherit] opacity-0"
      />
      <div className="relative z-10 flex w-full items-start justify-between gap-1 sm:gap-1.5">
        <span className="line-clamp-2 min-w-0 flex-1 text-[12px] sm:text-[13px] lg:text-[14px] font-bold leading-[15px] sm:leading-[16px] lg:leading-[17px]">
          {title}

          {upcoming && (
            <span className="ml-1 sm:ml-1.5 inline-block h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full bg-orange-500" />
          )}
        </span>

        <span
          className={`shrink-0 rounded-full px-1.5 py-0.5 sm:px-2 sm:py-1 text-[9px] sm:text-[10px] font-bold leading-none ${active
            ? "bg-white/20 text-white"
            : "bg-slate-200 text-slate-600"
            }`}
        >
          {count}
        </span>
      </div>

      <p
        className={`relative z-10 w-full truncate text-[10px] sm:text-[10.5px] lg:text-[11px] font-medium leading-[13px] lg:leading-[14px] ${active ? "text-white/90" : "text-slate-500"
          }`}
      >
        {subtitle}

        {upcoming && (
          <span className="font-bold text-orange-500">
            {" "}UPCOMING
          </span>
        )}
      </p>
    </button>
  );
}

// Reusable section container
function Section({ title, description, children }) {
  return (
    <section className="rounded-[18px] sm:rounded-[20px] lg:rounded-[22px] border border-slate-200 bg-white p-3.5 sm:p-4.5 lg:p-5 shadow-sm">
      <h2 className="text-[16px] sm:text-[17.5px] lg:text-[19px] font-bold leading-5 sm:leading-5.5 lg:leading-6 tracking-tight text-slate-900">
        {title}
      </h2>

      <p className="mt-1 text-[11.5px] sm:text-[12.5px] lg:text-[13px] leading-4.5 sm:leading-5 text-slate-500">
        {description}
      </p>

      <div className="my-2.5 sm:my-3 h-px bg-slate-100" />

      <div className="no-scrollbar flex gap-2 sm:gap-2.5 lg:gap-3 overflow-x-auto pb-1">
        {children}
      </div>
    </section>
  );
}

// Search icon
function SearchIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.35-4.35" />
    </svg>
  );
}

// Empty state document icon
function DocumentIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="30"
      height="30"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <path d="M14 2v6h6" />
      <path d="M8 13h8" />
      <path d="M8 17h8" />
    </svg>
  );
}

function ShareIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="18" cy="5" r="3" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="19" r="3" />
      <path d="m8.6 13.5 6.8 4M15.4 6.5l-6.8 4" />
    </svg>
  );
}

// Main content
export default function MockTestCatalog({ embedded = false }) {
  const [requestedExamName, setRequestedExamName] = useState("");
  const [examData, setExamData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [retryKey, setRetryKey] = useState(0);
  const [selectedExamId, setSelectedExamId] = useState(null);
  const [selectedSubjectId, setSelectedSubjectId] = useState(null);
  const [selectedClassificationId, setSelectedClassificationId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [paperFormat, setPaperFormat] = useState("all");
  const [paperScope, setPaperScope] = useState("All");
  const [shareFeedback, setShareFeedback] = useState({ paperId: null, message: "" });

  useEffect(() => {
    if (typeof window === "undefined") return;

    const params = new URLSearchParams(window.location.search);
    setRequestedExamName(params.get("exam")?.trim().toLowerCase() ?? "");
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    async function loadCatalog() {
      setLoading(true);
      setError("");

      try {
        const response = await fetch(`${apiBaseUrl}/lms/test-series`, {
          signal: controller.signal,
        });
        const payload = await response.json();

        if (!response.ok || !payload.success || !Array.isArray(payload.exams)) {
          throw new Error(payload.message || "The test series could not be loaded.");
        }

        setExamData(payload.exams);
        const initialExam =
          payload.exams.find(
            (exam) =>
              requestedExamName &&
              exam.name?.trim().toLowerCase() === requestedExamName
          ) ||
          payload.exams[0];
        const initialSubject = initialExam?.subjects?.[0];
        const initialClassification =
          initialSubject?.classifications?.find(
            (c) => (c.papers?.length > 0 || c.count > 0)
          ) || initialSubject?.classifications?.[0];

        setSelectedExamId(initialExam?.id ?? null);
        setSelectedSubjectId(initialSubject?.id ?? null);
        setSelectedClassificationId(initialClassification?.id ?? null);
      } catch (loadError) {
        if (loadError.name !== "AbortError") {
          setExamData([]);
          setError(loadError.message || "The test series could not be loaded.");
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    loadCatalog();
    return () => controller.abort();
  }, [retryKey, requestedExamName]);

  const currentExam =
    examData.find((exam) => String(exam.id) === String(selectedExamId)) ??
    examData[0];
  const subjects = currentExam?.subjects ?? [];
  const currentSubject =
    subjects.find((subject) => String(subject.id) === String(selectedSubjectId)) ??
    subjects[0];
  const classifications = currentSubject?.classifications ?? [];
  const currentClassification =
    classifications.find(
      (classification) => classification.id === selectedClassificationId
    ) ?? classifications[0];
  const papers = (currentClassification?.papers ?? []).filter((paper) => {
    const matchesFormat = paperFormat === "all" || paper.format === paperFormat;
    const matchesScope = paperScope === "All" || paper.scope === paperScope;
    const searchableText = [
      paper.title,
      paper.description,
      paper.format,
      paper.scope,
      paper.year,
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();
    const matchesSearch = searchableText.includes(searchQuery.trim().toLowerCase());

    return matchesFormat && matchesScope && matchesSearch;
  });

  function clearFilters() {
    setSearchQuery("");
    setPaperFormat("all");
    setPaperScope("All");
  }

  function handleExamChange(exam) {
    const firstSubject = exam.subjects?.[0];
    const defaultClassification =
      firstSubject?.classifications?.find(
        (c) => (c.papers?.length > 0 || c.count > 0)
      ) || firstSubject?.classifications?.[0];

    setSelectedExamId(exam.id);
    setSelectedSubjectId(firstSubject?.id ?? null);
    setSelectedClassificationId(defaultClassification?.id ?? null);
    clearFilters();
  }

  function handleSubjectChange(subject) {
    const defaultClassification =
      subject.classifications?.find(
        (c) => (c.papers?.length > 0 || c.count > 0)
      ) || subject.classifications?.[0];

    setSelectedSubjectId(subject.id);
    setSelectedClassificationId(defaultClassification?.id ?? null);
    clearFilters();
  }

  async function handleShare(paper) {
    const shareUrl = new URL(
      `/resgister?paperId=${encodeURIComponent(paper.id)}`,
      window.location.origin
    ).toString();
    const shareData = {
      title: paper.title,
      text: `${paper.title} - ${currentSubject?.name || currentExam?.name || "Test"}`,
      url: shareUrl,
    };

    setShareFeedback({ paperId: paper.id, message: "" });

    try {
      if (navigator.share) {
        try {
          await navigator.share(shareData);
          setShareFeedback({ paperId: paper.id, message: "Test link shared." });
          return;
        } catch (shareError) {
          if (shareError.name === "AbortError") return;
        }
      }

      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(shareUrl);
      } else {
        const input = document.createElement("textarea");
        input.value = shareUrl;
        input.setAttribute("readonly", "");
        input.style.position = "fixed";
        input.style.opacity = "0";
        document.body.appendChild(input);
        let copied = false;
        try {
          input.select();
          copied = document.execCommand("copy");
        } finally {
          document.body.removeChild(input);
        }

        if (!copied) {
          throw new Error("The browser could not copy the test link.");
        }
      }

      setShareFeedback({ paperId: paper.id, message: "Test link copied." });
    } catch (shareError) {
      if (shareError.name === "AbortError") return;
      setShareFeedback({
        paperId: paper.id,
        message: "Could not share this test. Please try again.",
      });
    }
  }

  const ContentWrapper = embedded ? "div" : "main";

  return (
    <ContentWrapper
      className={`mt-20 bg-white p-3 sm:p-4 ${embedded ? "min-h-0" : "min-h-screen"}`}
    >
      <div className="mx-auto max-w-[1240px] space-y-5 rounded-[18px] border border-slate-200 bg-white p-3 sm:p-5">
        {loading && (
          <div
            className="rounded-[15px] border border-blue-100 bg-blue-50 px-4 py-3 text-sm text-blue-700 "
            role="status"
          >
            Loading test series from the database...
          </div>
        )}

        {/* LEVEL 1: EXAMINATION */}
        <Section
          title="Select Target Examination"
          description="Click any exam below to isolate and view only its dedicated test papers."
        >
          {examData.length ? (
            examData.map((exam) => (
              <FilterCard
                key={exam.id}
                title={exam.name}
                count={exam.count}
                subtitle={`${exam.count} Subjects${exam.description ? ` · ${exam.description}` : ""}`}
                upcoming={Boolean(exam.upcoming)}
                active={currentExam === exam}
                onClick={() => handleExamChange(exam)}
              />
            ))
          ) : (
            !loading && (
              <p className="text-sm text-slate-500">
                No published examinations are available.
              </p>
            )
          )}
        </Section>

        {/* LEVEL 2: SUBJECT */}
        <Section
          title="Select Subject / Paper"
          description={`Filter mock papers by specific subject syllabus for ${currentExam?.name || "the selected exam"}.`}
        >
          {subjects.length ? (
            subjects.map((subject) => (
              <FilterCard
                key={subject.id}
                title={subject.name}
                count={subject.count}
                subtitle={`${subject.count} Papers${subject.description ? ` · ${subject.description}` : ""}`}
                active={currentSubject === subject}
                onClick={() => handleSubjectChange(subject)}
              />
            ))
          ) : (
            <p className="text-sm text-slate-500">
              No published subjects are available for this examination.
            </p>
          )}
        </Section>

        {/* LEVEL 3: PAPER CLASSIFICATION */}
        <Section
          title="Select Paper Classification"
          description={`Select a paper classification for ${currentExam?.name || "the selected exam"}.`}
        >
          {classifications.length ? (
            classifications.map((classification) => (
              <FilterCard
                key={classification.id}
                title={classification.name}
                count={classification.count}
                subtitle={`${classification.count} ${classification.count === 1 ? "Paper" : "Papers"
                  }`}
                active={
                  currentClassification === classification
                }
                onClick={() => setSelectedClassificationId(classification.id)}
              />
            ))
          ) : (
            <p className="text-sm text-slate-500">
              No published paper classifications are available for this subject.
            </p>
          )}
        </Section>

        {/* SEARCH AND FILTER BAR */}
        <section className="rounded-[16px] sm:rounded-[18px] lg:rounded-[20px] border border-slate-200 bg-slate-50 p-2.5 sm:p-4 lg:p-5">
          <div className="flex flex-col gap-2.5 sm:gap-3 lg:flex-row lg:items-center">
            <div className="relative min-w-0 flex-1">
              <span className="pointer-events-none absolute left-3.5 sm:left-4 top-1/2 -translate-y-1/2 text-slate-400">
                <SearchIcon />
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder={`Search ${currentExam?.name || "test"} papers by title, format, or keywords...`}
                className="h-11 sm:h-12 w-full rounded-[13px] sm:rounded-[15px] border border-slate-300 bg-white pl-10 sm:pl-12 pr-4 text-xs sm:text-sm text-slate-800 outline-none placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3 lg:gap-3">
              <select
                value={paperFormat}
                onChange={(event) => setPaperFormat(event.target.value)}
                className="h-11 sm:h-12 w-full rounded-[13px] sm:rounded-[15px] border border-slate-400 bg-white px-3 sm:px-4 text-xs sm:text-sm text-slate-800 outline-none focus:ring-1 focus:ring-blue-200 sm:w-[220px] lg:w-[285px]"
                aria-label="Filter paper format"
              >
                <option value="all">All Formats</option>
                <option value="PYQ">Prev. Year Paper (PYQ)</option>
                <option value="MCQ">MCQ</option>
                <option value="Sketching">Sketching</option>
              </select>

              <div className="flex h-11 sm:h-12 shrink-0 items-center justify-center rounded-[13px] sm:rounded-[15px] border border-slate-200 bg-slate-200/60 p-1">
                {["All", "Full", "Sectional"].map((scope) => (
                  <button
                    key={scope}
                    type="button"
                    onClick={() => setPaperScope(scope)}
                    aria-pressed={paperScope === scope}
                    className={`flex-1 sm:flex-initial h-full rounded-[9px] sm:rounded-[11px] px-2.5 sm:px-3 text-xs sm:text-sm font-medium transition-colors ${paperScope === scope
                      ? "bg-white text-slate-900 shadow-sm"
                      : "text-slate-500 hover:text-slate-900"
                      }`}
                  >
                    {scope}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* TEST PAPERS */}
        <div className="flex flex-wrap items-center justify-between gap-2.5 sm:gap-3 px-1">
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <h3 className="text-sm sm:text-base font-bold text-slate-900">
              {currentExam?.name || "Test"} Papers
            </h3>
            <span className="rounded-full border border-blue-200 bg-blue-50 px-2.5 sm:px-3 py-0.5 sm:py-1 text-[9px] sm:text-[10px] font-semibold text-blue-600">
              {loading ? "Loading..." : `${papers.length} Tests Available`}
            </span>
          </div>
          <button
            type="button"
            onClick={clearFilters}
            className="text-xs sm:text-sm text-slate-500 transition-colors hover:text-blue-600"
          >
            ✕ Clear Filter
          </button>
        </div>

        {error ? (
          <section
            className="rounded-[18px] sm:rounded-[20px] border border-red-200 bg-red-50 p-4 sm:p-6 text-center"
            role="alert"
          >
            <h3 className="font-bold text-red-800 text-sm sm:text-base">Could not load test papers</h3>
            <p className="mt-1.5 sm:mt-2 text-xs sm:text-sm text-red-700">{error}</p>
            <button
              type="button"
              onClick={() => setRetryKey((key) => key + 1)}
              className="mt-3 sm:mt-4 rounded-[12px] bg-red-700 px-4 py-2 text-xs sm:text-sm font-bold text-white hover:bg-red-800"
            >
              Retry
            </button>
          </section>
        ) : loading ? (
          <section
            className="flex min-h-[180px] sm:min-h-[220px] items-center justify-center rounded-[20px] sm:rounded-[30px] border border-slate-200 bg-white text-xs sm:text-sm text-slate-500"
            role="status"
          >
            Loading papers...
          </section>
        ) : papers.length ? (
          <section className="grid gap-2.5 sm:gap-3 sm:grid-cols-2">
            {papers.map((paper) => {
              const classificationName = currentClassification?.name || "";
              const classificationYear = classificationName.match(/\b20\d{2}\b/)?.[0];
              const isPreviousYearPaper =
                paper.format === "PYQ" || /prev|previous|pyq/i.test(classificationName);
              const sourceLabel = isPreviousYearPaper
                ? `PYQ${paper.year || classificationYear ? `-${paper.year || classificationYear}` : ""}`
                : classificationName;

              return (
                <article
                  key={paper.id}
                  className="flex flex-col justify-between rounded-[16px] sm:rounded-[18px] border border-slate-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md"
                >
                  <div>
                    <div className="mb-2.5 flex flex-wrap items-start justify-between gap-2">
                      <div className="flex flex-wrap gap-1.5">
                        {[currentExam?.name, currentSubject?.name, sourceLabel]
                          .filter(Boolean)
                          .map((label, index) => (
                            <span
                              key={`${label}-${index}`}
                              className={`rounded-md border px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide ${index === 1
                                ? "border-violet-200 bg-violet-50 text-violet-700"
                                : index === 2
                                  ? "border-blue-200 bg-blue-50 text-blue-700"
                                  : "border-slate-200 bg-slate-50 text-slate-600"
                                }`}
                            >
                              {label}
                            </span>
                          ))}
                      </div>
                      <button
                        type="button"
                        onClick={() => handleShare(paper)}
                        aria-label={`Share ${paper.title}`}
                        title="Share test"
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-600 transition-colors hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-200"
                      >
                        <ShareIcon />
                      </button>
                    </div>

                    <h4 className="pr-1 text-sm font-bold leading-snug text-slate-900 sm:text-base">
                      {paper.title}
                    </h4>
                    {paper.description && (
                      <p className="mt-1.5 text-xs leading-4.5 text-slate-600 sm:text-sm sm:leading-5">
                        {paper.description}
                      </p>
                    )}
                    <p className="mt-2 text-[11px] text-slate-500">
                      {[paper.year || classificationYear, paper.scope]
                        .filter(Boolean)
                        .join(" · ")}
                    </p>

                    <div className="mt-2.5 flex flex-wrap gap-1.5 border-t border-slate-100 pt-2.5">
                      {[
                        paper.durationMinutes && `${paper.durationMinutes} Mins`,
                        paper.totalMarks && `${paper.totalMarks} Marks`,
                        paper.questionCount && `${paper.questionCount} Qs`,
                      ]
                        .filter(Boolean)
                        .map((detail) => (
                          <span
                            key={detail}
                            className="rounded-md border border-slate-200 bg-slate-50 px-2 py-1 text-[10px] font-semibold text-slate-600"
                          >
                            {detail}
                          </span>
                        ))}
                    </div>
                    {shareFeedback.paperId === paper.id && shareFeedback.message && (
                      <p
                        className={`mt-2 text-xs ${shareFeedback.message.startsWith("Could not")
                          ? "text-red-600"
                          : "text-emerald-700"
                          }`}
                        role="status"
                      >
                        {shareFeedback.message}
                      </p>
                    )}
                  </div>

                  {(paper.testUrl || paper.fileUrl) && (
                    <div className="mt-3.5 flex flex-wrap gap-2">
                      {paper.testUrl && (
                        <a
                          href={`/resgister?paperId=${encodeURIComponent(paper.id)}`}
                          className="flex-1 rounded-[10px] bg-indigo-600 px-3.5 py-2 text-center text-xs font-semibold text-white transition-colors hover:bg-indigo-700 sm:flex-initial sm:text-sm"
                        >
                          Open test
                        </a>
                      )}
                      {paper.fileUrl && (
                        <a
                          href={paper.fileUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="flex-1 rounded-[10px] border border-slate-300 px-3.5 py-2 text-center text-xs font-semibold text-slate-700 transition-colors hover:border-blue-400 hover:text-blue-700 sm:flex-initial sm:text-sm"
                        >
                          View paper
                        </a>
                      )}
                    </div>
                  )}
                </article>
              );
            })}
          </section>
        ) : (
          <section className="flex min-h-[260px] sm:min-h-[335px] flex-col items-center justify-center rounded-[20px] sm:rounded-[30px] border border-slate-200 bg-white px-4 sm:px-5 py-8 sm:py-10 text-center">
            <div className="mb-3 sm:mb-4 flex h-12 w-12 sm:h-[60px] sm:w-[60px] items-center justify-center rounded-full bg-slate-100 text-slate-400">
              <DocumentIcon />
            </div>
            <h3 className="text-sm sm:text-base font-bold text-slate-900">
              No test papers found for {currentExam?.name || "this selection"}
            </h3>
            <p className="mt-2.5 sm:mt-4 max-w-[470px] text-xs sm:text-sm leading-4.5 sm:leading-5 text-slate-500">
              There are currently no published papers matching{" "}
              <span className="font-medium text-slate-400">
                &quot;{searchQuery || currentSubject?.name || currentExam?.name || "your selection"}&quot;
              </span>{" "}
              with the current filters.
            </p>
            <button
              type="button"
              onClick={clearFilters}
              className="mt-3.5 sm:mt-4 cursor-pointer rounded-[12px] sm:rounded-[15px] bg-blue-600 px-4 sm:px-5 py-2.5 sm:py-3 text-xs sm:text-sm font-bold text-white shadow-sm transition-colors hover:bg-blue-700"
            >
              Reset Filters
            </button>
          </section>
        )}
      </div>
    </ContentWrapper>
  );
}
