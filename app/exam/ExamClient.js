"use client";

import { useEffect, useState } from "react";
import {
  CircleUserRound,
  Clock3,
} from "lucide-react";

const apiBaseUrl = (
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"
).replace(/\/$/, "");

const demoQuestions = [
  {
    prompt: "Which number comes next in the series? 2, 4, 6, 8, ?",
    options: ["9", "10", "11", "12"],
    answer: 1,
  },
  {
    prompt: "Which number comes next in the series? 3, 6, 12, 24, ?",
    options: ["36", "42", "48", "52"],
    answer: 2,
  },
  {
    prompt: "Which number comes next in the series? 1, 4, 9, 16, ?",
    options: ["20", "25", "26", "32"],
    answer: 1,
  },
  {
    prompt: "Which number comes next in the series? 5, 10, 17, 26, ?",
    options: ["35", "36", "37", "38"],
    answer: 2,
  },
  {
    prompt: "Which number comes next in the series? 1, 1, 2, 3, 5, ?",
    options: ["7", "8", "9", "10"],
    answer: 1,
  },
  {
    prompt: "Which number comes next in the series? 2, 6, 12, 20, 30, ?",
    options: ["36", "40", "42", "44"],
    answer: 2,
  },
  {
    prompt: "Which number comes next in the series? 100, 90, 81, 73, ?",
    options: ["65", "66", "67", "68"],
    answer: 1,
  },
  {
    prompt: "Which number comes next in the series? 2, 5, 10, 17, 26, ?",
    options: ["35", "36", "37", "38"],
    answer: 2,
  },
  {
    prompt: "Which number comes next in the series? 7, 14, 28, 56, ?",
    options: ["84", "98", "112", "120"],
    answer: 2,
  },
  {
    prompt: "Which number comes next in the series? 1, 3, 6, 10, 15, ?",
    options: ["18", "20", "21", "24"],
    answer: 2,
  },
  {
    prompt: "Which number comes next in the series? 4, 9, 16, 25, ?",
    options: ["30", "32", "36", "49"],
    answer: 2,
  },
  {
    prompt: "Which number comes next in the series? 81, 27, 9, 3, ?",
    options: ["0", "1", "2", "6"],
    answer: 1,
  },
];

const defaultExam = {
  title: "Practice Exam",
  subject: "Sample Questions",
  durationSeconds: 60 * 60,
};

function formatTime(seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;
  const parts = [minutes, remainingSeconds].map((part) =>
    String(part).padStart(2, "0")
  );

  return hours > 0
    ? `${String(hours).padStart(2, "0")}:${parts.join(":")}`
    : parts.join(":");
}

export default function ExamClient({ paperId }) {
  const [exam, setExam] = useState(paperId ? null : defaultExam);
  const [loading, setLoading] = useState(Boolean(paperId));
  const [error, setError] = useState("");
  const [remainingSeconds, setRemainingSeconds] = useState(
    defaultExam.durationSeconds
  );
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [visitedQuestions, setVisitedQuestions] = useState([0]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [timedOut, setTimedOut] = useState(false);

  useEffect(() => {
    if (!paperId) {
      return;
    }

    const controller = new AbortController();

    async function loadExam() {
      setLoading(true);
      setError("");

      try {
        const response = await fetch(
          `${apiBaseUrl}/lms/exams/${encodeURIComponent(paperId)}`,
          { signal: controller.signal }
        );
        const payload = await response.json();

        if (!response.ok || !payload.success || !payload.exam) {
          throw new Error(payload.message || "The exam details could not be loaded.");
        }

        const paper = payload.exam;

        const durationMinutes = Number(paper.durationMinutes);
        if (!Number.isFinite(durationMinutes) || durationMinutes <= 0) {
          throw new Error("The selected paper does not have a valid duration.");
        }

        const examDetails = {
          title: paper.title,
          subject: paper.subjectName || "Sample Questions",
          durationSeconds: Math.floor(durationMinutes * 60),
        };
        setExam(examDetails);
        setRemainingSeconds(examDetails.durationSeconds);
      } catch (loadError) {
        if (loadError.name !== "AbortError") {
          setError(loadError.message || "The exam details could not be loaded.");
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    loadExam();
    return () => controller.abort();
  }, [paperId]);

  useEffect(() => {
    if (!exam || loading || error || isSubmitted) {
      return undefined;
    }

    let active = true;
    const deadline = Date.now() + exam.durationSeconds * 1000;

    async function runCountdown() {
      let secondsRemaining = exam.durationSeconds;

      while (active && secondsRemaining > 0) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        if (!active) {
          return;
        }

        secondsRemaining = Math.max(
          0,
          Math.ceil((deadline - Date.now()) / 1000)
        );
        setRemainingSeconds(secondsRemaining);
      }

      if (active) {
        setTimedOut(true);
        setIsSubmitted(true);
      }
    }

    runCountdown();
    return () => {
      active = false;
    };
  }, [exam, loading, error, isSubmitted]);

  function visitQuestion(index) {
    setCurrentQuestion(index);
    setVisitedQuestions((visited) =>
      visited.includes(index) ? visited : [...visited, index]
    );
  }

  function selectAnswer(optionIndex) {
    setAnswers((currentAnswers) => ({
      ...currentAnswers,
      [currentQuestion]: optionIndex,
    }));
  }

  const score = demoQuestions.reduce(
    (total, question, index) =>
      total + (answers[index] === question.answer ? 1 : 0),
    0
  );
  const question = demoQuestions[currentQuestion];

  if (loading) {
    return (
      <main className="mt-16 flex min-h-[calc(100vh-4rem)] items-center justify-center bg-slate-100 px-4">
        <p role="status" className="text-slate-600">Loading selected exam...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="mt-16 min-h-[calc(100vh-4rem)] bg-slate-100 px-4 py-10 sm:px-6">
        <section className="mx-auto max-w-3xl rounded-xl border border-red-200 bg-white p-6 text-center">
          <h1 className="text-xl font-bold text-red-800">Could not open this exam</h1>
          <p className="mt-2 text-sm text-red-700" role="alert">{error}</p>
        </section>
      </main>
    );
  }

  return (
    <main className="mt-16 min-h-[calc(100vh-4rem)] w-full bg-slate-100 px-4 py-8 sm:px-6 sm:py-10 lg:px-10">
      <div className="mx-auto w-full max-w-6xl">
        <h1 className="text-center text-3xl font-semibold text-blue-900">
          Online Examination Interface
        </h1>
        <p className="mt-2 text-center text-sm text-slate-600">
          {exam.title} · {exam.subject} · Sample practice questions
        </p>

        {isSubmitted ? (
          <section className="mx-auto mt-10 max-w-2xl rounded-xl bg-white p-8 text-center shadow-sm">
            <h2 className="text-2xl font-bold text-slate-900">
              {timedOut ? "Time is up" : "Exam submitted"}
            </h2>
            <p className="mt-3 text-lg text-slate-700">
              Your demo score: <strong>{score}</strong> of {demoQuestions.length}
            </p>
            <p className="mt-2 text-sm text-slate-500">
              Answers in this sample exam are not saved to an account.
            </p>
          </section>
        ) : (
          <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-[3fr_1.5fr]">
            <section className="rounded-xl bg-white p-5 shadow-sm sm:p-7">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h2 className="text-lg font-bold text-slate-900">
                  Question {currentQuestion + 1} of {demoQuestions.length}
                </h2>
                <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                  Sample question
                </span>
              </div>

              <p className="mt-6 text-lg font-medium leading-relaxed text-slate-800">
                {question.prompt}
              </p>

              <div className="mt-6 space-y-3">
                {question.options.map((option, index) => {
                  const selected = answers[currentQuestion] === index;

                  return (
                    <button
                      key={option}
                      type="button"
                      aria-pressed={selected}
                      onClick={() => selectAnswer(index)}
                      className={`w-full rounded-lg border p-3 text-left transition ${
                        selected
                          ? "border-blue-600 bg-blue-50 text-blue-900"
                          : "border-slate-200 bg-slate-50 text-slate-800 hover:border-blue-300 hover:bg-blue-50"
                      }`}
                    >
                      {String.fromCharCode(65 + index)}) {option}
                    </button>
                  );
                })}
              </div>

              <div className="mt-8 flex items-center justify-between gap-3">
                <button
                  type="button"
                  disabled={currentQuestion === 0}
                  onClick={() => visitQuestion(currentQuestion - 1)}
                  className="rounded-full bg-slate-200 px-5 py-2.5 font-semibold text-slate-800 hover:bg-slate-300 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Previous
                </button>

                <button
                  type="button"
                  onClick={() => setIsSubmitted(true)}
                  className="rounded-full bg-blue-600 px-5 py-2.5 font-semibold text-white hover:bg-blue-700"
                >
                  Submit Exam
                </button>

                <button
                  type="button"
                  disabled={currentQuestion === demoQuestions.length - 1}
                  onClick={() => visitQuestion(currentQuestion + 1)}
                  className="rounded-full bg-emerald-200 px-5 py-2.5 font-semibold text-slate-900 hover:bg-emerald-300 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </section>

            <aside className="space-y-5">
              <div className="flex items-center justify-center gap-3 rounded-xl bg-white p-5 shadow-sm">
                <CircleUserRound size={30} />
                <span className="font-semibold text-slate-800">Candidate</span>
              </div>

              <div className="flex flex-col items-center gap-2 rounded-xl bg-white p-5 shadow-sm">
                <Clock3 size={28} className={remainingSeconds < 60 ? "text-red-600" : "text-emerald-700"} />
                <p
                  className="text-3xl font-bold tabular-nums text-slate-900"
                  role="timer"
                  aria-live="off"
                >
                  {formatTime(remainingSeconds)}
                </p>
                <span className="text-sm text-slate-500">Remaining time</span>
              </div>

              <div className="rounded-xl bg-white p-5 shadow-sm">
                <h2 className="mb-4 text-lg font-bold text-slate-900">Question Palette</h2>
                <div className="grid grid-cols-4 gap-2">
                  {demoQuestions.map((_, index) => {
                    const answered = answers[index] !== undefined;
                    const visited = visitedQuestions.includes(index);
                    const paletteColor = answered
                      ? "bg-emerald-600 text-white"
                      : visited
                        ? "bg-red-500 text-white"
                        : "bg-slate-200 text-slate-800";

                    return (
                      <button
                        key={index}
                        type="button"
                        aria-label={`Go to question ${index + 1}${answered ? ", answered" : visited ? ", visited" : ", not visited"}`}
                        aria-current={currentQuestion === index ? "step" : undefined}
                        onClick={() => visitQuestion(index)}
                        className={`rounded-md py-2 text-sm font-semibold ${paletteColor} ${
                          currentQuestion === index ? "ring-2 ring-blue-700 ring-offset-2" : ""
                        }`}
                      >
                        {index + 1}
                      </button>
                    );
                  })}
                </div>
                <ul className="mt-4 space-y-1 text-xs text-slate-600">
                  <li><span className="mr-2 inline-block h-3 w-3 rounded-sm bg-emerald-600 align-middle" />Answered</li>
                  <li><span className="mr-2 inline-block h-3 w-3 rounded-sm bg-red-500 align-middle" />Visited, not answered</li>
                  <li><span className="mr-2 inline-block h-3 w-3 rounded-sm bg-slate-200 align-middle" />Not visited</li>
                </ul>
              </div>
            </aside>
          </div>
        )}
      </div>
    </main>
  );
}
