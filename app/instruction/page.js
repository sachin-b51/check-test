
import Link from "next/link";
import {
  MonitorCheck,
  LockKeyhole,
  ClipboardCheck,
  SearchCheck,
  MessageSquareText,
  Laptop,
  FileCheck2,
  Upload,
  CheckCircle2,
} from "lucide-react";

const instructions = [
  {
    id: 1,
    title: "Logging In and Getting Ready",
    color: "bg-emerald-200",
    icon: MonitorCheck,
    rightIcon: LockKeyhole,
    points: [
      "Log in with correct credentials before the scheduled time.",
      "Check webcam, microphone, and internet connection.",
      "Keep your photo ID ready for verification.",
    ],
  },
  {
    id: 2,
    title: "Understanding the Instructions",
    color: "bg-orange-300",
    icon: ClipboardCheck,
    rightIcon: SearchCheck,
    points: [
      "Read exam duration, number of questions, and rules.",
      "Review policies carefully.",
      "Verify audio and video setup for proctored exams.",
      "Start only when instructions are clear.",
    ],
  },
  {
    id: 3,
    title: "Smooth Operation of the Test",
    color: "bg-emerald-200",
    icon: MessageSquareText,
    rightIcon: Laptop,
    points: [
      "Track the timer on screen.",
      "Use Next/Previous to navigate.",
      "Flag questions for review.",
      "Save answers regularly.",
      "Submit only once and avoid switching tabs.",
    ],
  },
  {
    id: 4,
    title: "Submitting Your Test",
    color: "bg-indigo-300",
    icon: FileCheck2,
    rightIcon: Upload,
    points: [
      "Review flagged questions if time allows.",
      "Confirm all answers before final submission.",
      "Log out safely after completion.",
    ],
  },
];

function InstructionCard({ item }) {
  const LeftIcon = item.icon;
  const RightIcon = item.rightIcon;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-[120px_1fr_120px] items-center gap-5 rounded-xl bg-white p-6 sm:p-7 shadow-sm hover:shadow-md transition-all duration-300">

      {/* Left Icon */}
      <div className="flex justify-center">
        <div className={`${item.color} flex h-25 w-25 items-center justify-center rounded-full`}>
          <LeftIcon size={50} strokeWidth={1.7} />
        </div>
      </div>

      {/* Instructions */}
      <div>
        <h2 className="mb-2 text-lg font-bold text-slate-900">
          {item.id}. {item.title}
        </h2>

        <ul className="list-disc space-y-1 pl-8 text-xs leading-relaxed text-slate-700 sm:text-base">
          {item.points.map((point, index) => (
            <li key={index}>{point}</li>
          ))}
        </ul>
      </div>

      {/* Right Icon */}
      <div className="hidden sm:flex justify-center">
        <div className="relative rounded-xl bg-slate-100 p-4">
          <RightIcon size={50} strokeWidth={1.6} />

          <span className="absolute -right-2 -top-2 rounded-full bg-blue-500 p-1.5">
            <CheckCircle2 size={18} className="text-white" />
          </span>
        </div>
      </div>

    </div>
  );
}

export default async function InstructionPage({ searchParams }) {
  const { paperId } = (await searchParams) || {};
  const examHref = paperId
    ? `/exam?paperId=${encodeURIComponent(paperId)}`
    : "/exam";

  return (
    <main className="mt-16 min-h-[calc(100vh-4rem)] w-full bg-slate-100 px-4 py-8 sm:px-6 sm:py-10 lg:px-10">

      <div className="mx-auto w-full max-w-5xl">

        <h1 className="flex justify-center text-center text-3xl font-bold text-slate-900">
          Rules and Instructions for the Test !
        </h1>
        <div className="mx-auto mt-2 h-1 w-78 rounded-full bg-slate-800 sm:w-96"></div>

        <div className="mt-10 space-y-8">
          {instructions.map((item) => (
            <InstructionCard key={item.id} item={item} />
          ))}
        </div>

        <Link
          href={examHref}
          className=" mx-auto w-40 mt-8 flex items-center justify-center rounded-full bg-blue-500 px-6 py-3 text-white hover:bg-blue-800 font-semibold">
          Get Started
        </Link>

      </div>
    </main>
  );
}
