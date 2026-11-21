"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { X, ArrowRight } from "lucide-react";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });
const simpleHeadingStyle = { fontFamily: "inherit", fontWeight: 600, fontStyle: "normal", letterSpacing: "normal", textTransform: "none" };

const apiBaseUrl = (
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"
).replace(/\/$/, "");

// 1. DEFAULT EXAMS DATA (Matches high-design mockups + fallback)
const defaultExamsData = [
  {
    id: 1,
    name: "NIFT B.Des",
    shortCode: "NIFT",
    category: "Design Entrance",
    categoryKey: "design",
    badge: "Active",
    description: "Choose a phase, select a mock mode, read the instructions and start your CBT practice.",
    tags: ["CBT interface", "Timer", "Analysis"],
    papers: [
      { id: 101, title: "NIFT 2025 Full Mock Test 01", format: "Full Mock", duration: "120 Mins", marks: "100 Marks", questions: "100 Qs" },
      { id: 102, title: "NIFT 2024 Solved PYQ Paper", format: "PYQ", duration: "120 Mins", marks: "100 Marks", questions: "100 Qs" },
      { id: 103, title: "NIFT GAT Reasoning & English Sectional", format: "Sectional", duration: "60 Mins", marks: "50 Marks", questions: "50 Qs" },
    ],
  },
  {
    id: 2,
    name: "NID DAT Prelims",
    shortCode: "NID",
    category: "Design Entrance",
    categoryKey: "design",
    badge: "Active",
    description: "Choose a phase, select a mock mode, read the instructions and start your CBT practice.",
    tags: ["CBT interface", "Timer", "Analysis"],
    papers: [
      { id: 201, title: "NID DAT Prelims 2025 Mock 01", format: "Full Mock", duration: "180 Mins", marks: "100 Marks", questions: "68 Qs" },
      { id: 202, title: "NID DAT 2024 Official Paper", format: "PYQ", duration: "180 Mins", marks: "100 Marks", questions: "65 Qs" },
    ],
  },
  {
    id: 3,
    name: "UCEED (IIT Bombay)",
    shortCode: "UCEE",
    category: "Design Entrance",
    categoryKey: "design",
    badge: "Active",
    description: "Choose a phase, select a mock mode, read the instructions and start your CBT practice.",
    tags: ["CBT interface", "Timer", "Analysis"],
    papers: [
      { id: 301, title: "UCEED 2025 Part-A Full Mock", format: "Full Mock", duration: "150 Mins", marks: "240 Marks", questions: "57 Qs" },
      { id: 302, title: "UCEED 2024 Solved Official Paper", format: "PYQ", duration: "180 Mins", marks: "300 Marks", questions: "68 Qs" },
    ],
  },
  {
    id: 4,
    name: "NATA 2025",
    shortCode: "NATA",
    category: "Architecture",
    categoryKey: "architecture",
    badge: "Active",
    description: "Choose a phase, select a mock mode, read the instructions and start your CBT practice.",
    tags: ["CBT interface", "Timer", "Analysis"],
    papers: [
      { id: 401, title: "NATA 2025 Full Length Mock 01", format: "Full Mock", duration: "180 Mins", marks: "200 Marks", questions: "125 Qs" },
      { id: 402, title: "NATA Architectural Awareness & Math", format: "Sectional", duration: "90 Mins", marks: "100 Marks", questions: "60 Qs" },
    ],
  },
  {
    id: 5,
    name: "JEE Paper 2 (B.Arch)",
    shortCode: "JEE",
    category: "Architecture",
    categoryKey: "architecture",
    badge: "Active",
    description: "Choose a phase, select a mock mode, read the instructions and start your CBT practice.",
    tags: ["CBT interface", "Timer", "Analysis"],
    papers: [
      { id: 501, title: "JEE Main Paper 2 Full CBT Mock", format: "Full Mock", duration: "180 Mins", marks: "400 Marks", questions: "82 Qs" },
      { id: 502, title: "JEE B.Arch Aptitude & Drawing Theory", format: "Sectional", duration: "120 Mins", marks: "200 Marks", questions: "50 Qs" },
    ],
  },
  {
    id: 6,
    name: "CEED (IIT M.Des)",
    shortCode: "CEED",
    category: "Master’s & PG",
    categoryKey: "masters",
    badge: "Active",
    description: "Choose a phase, select a mock mode, read the instructions and start your CBT practice.",
    tags: ["CBT interface", "Timer", "Analysis"],
    papers: [
      { id: 601, title: "CEED 2025 Part-A Objective Mock", format: "Full Mock", duration: "60 Mins", marks: "100 Marks", questions: "41 Qs" },
      { id: 602, title: "CEED 2024 Official Solved Mock", format: "PYQ", duration: "180 Mins", marks: "200 Marks", questions: "45 Qs" },
    ],
  },
  {
    id: 7,
    name: "NIFT M.Des",
    shortCode: "NIFT",
    category: "Master’s & PG",
    categoryKey: "masters",
    badge: "Active",
    description: "Choose a phase, select a mock mode, read the instructions and start your CBT practice.",
    tags: ["CBT interface", "Timer", "Analysis"],
    papers: [
      { id: 701, title: "NIFT Master's GAT Advanced Mock", format: "Full Mock", duration: "120 Mins", marks: "100 Marks", questions: "100 Qs" },
    ],
  },
  {
    id: 8,
    name: "CUET UG Design",
    shortCode: "CUET",
    category: "CUET & Fine Arts",
    categoryKey: "cuet",
    badge: "Active",
    description: "Choose a phase, select a mock mode, read the instructions and start your CBT practice.",
    tags: ["CBT interface", "Timer", "Analysis"],
    papers: [
      { id: 801, title: "CUET Fine Arts & Visual Arts Mock", format: "Full Mock", duration: "45 Mins", marks: "200 Marks", questions: "50 Qs" },
      { id: 802, title: "CUET General Test Sectional Practice", format: "Sectional", duration: "60 Mins", marks: "250 Marks", questions: "60 Qs" },
    ],
  },
  {
    id: 9,
    name: "Fine Arts & BFA",
    shortCode: "Fine",
    category: "CUET & Fine Arts",
    categoryKey: "cuet",
    badge: "Active",
    description: "Choose a phase, select a mock mode, read the instructions and start your CBT practice.",
    tags: ["CBT interface", "Timer", "Analysis"],
    papers: [
      { id: 901, title: "College of Art BFA Theory Mock 01", format: "Full Mock", duration: "60 Mins", marks: "100 Marks", questions: "50 Qs" },
    ],
  },
  {
    id: 10,
    name: "Daily GK & Current Affairs",
    shortCode: "GK",
    category: "General Knowledge",
    categoryKey: "gk",
    badge: "Active",
    description: "Choose a phase, select a mock mode, read the instructions and start your CBT practice.",
    tags: ["CBT interface", "Timer", "Analysis"],
    papers: [
      { id: 1001, title: "Design Culture & Art History Daily Quiz", format: "Daily Quiz", duration: "25 Mins", marks: "50 Marks", questions: "25 Qs" },
      { id: 1002, title: "National & International Current Affairs", format: "Daily Quiz", duration: "30 Mins", marks: "60 Marks", questions: "30 Qs" },
    ],
  },
];

// Categories definition
const examCategories = [
  { label: "All", key: "All" },
  { label: "Design Entrance", key: "Design Entrance" },
  { label: "Architecture", key: "Architecture" },
  { label: "Master’s & PG", key: "Master’s & PG" },
  { label: "CUET & Fine Arts", key: "CUET & Fine Arts" },
  { label: "General Knowledge", key: "General Knowledge" },
];

// Features definition
const featureList = [
  {
    title: "AI-powered questions",
    desc: "Practice built around the exam pattern, section level and difficulty, so preparation feels realistic.",
    pill: "Exam-level practice",
    color: "#9333ea",
    bg: "#f5ebff",
    path: "M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z",
  },
  {
    title: "Real CBT interface",
    desc: "Timer, question palette, review marking, section flow and a final submit screen.",
    pill: "Actual test feel",
    color: "#1556f0",
    bg: "#e8efff",
    path: "M4 5h16v11H4zM9 20h6M12 16v4",
  },
  {
    title: "Instant results",
    desc: "See your score, correct studentAnswers, mistakes and explanations right after you submit.",
    pill: "Fast feedback",
    color: "#f59e0b",
    bg: "#fff4dc",
    path: "M13 2 4 14h7l-1 8 9-12h-7z",
  },
  {
    title: "Smart analytics",
    desc: "Track accuracy, speed, strong sections and weak areas to focus your next attempt.",
    pill: "Performance tracking",
    color: "#0f9d6c",
    bg: "#e3f8ee",
    path: "M5 20V10M12 20V4M19 20v-7",
  },
];

// FAQs definition
const faqItems = [
  {
    q: "How do I register for a mock test?",
    a: "Create an account in a few steps and start practising. Many mocks also run without a login.",
  },
  {
    q: "Which exams are covered?",
    a: "NIFT, NID, UCEED, NATA, JEE B.Arch, CEED, CUET design and more, with new papers added regularly.",
  },
  {
    q: "Will I get my result immediately?",
    a: "Yes. Your score and answer review are available as soon as you submit the test.",
  },
  {
    q: "Can I practise one section at a time?",
    a: "Yes. Choose a sectional mock to focus on a single part of the paper.",
  },
];

// CBT Interactive Questions
const sampleTestQuestions = [
  {
    section: "Design",
    questionText: "A poster pairs a large image on the left with small bold text on the right. This is…",
    options: ["Symmetry", "Asymmetrical balance", "Repetition", "Proportion"],
    correctAnswer: 1,
  },
  {
    section: "Design",
    questionText: "What is the complement of blue on the RYB colour wheel?",
    options: ["Green", "Violet", "Orange", "Yellow"],
    correctAnswer: 2,
  },
  {
    section: "GK",
    questionText: "The National Institute of Design’s main campus is in which city?",
    options: ["Pune", "Mumbai", "Bengaluru", "Ahmedabad"],
    correctAnswer: 3,
  },
  {
    section: "Aptitude",
    questionText: "Find the next number: 2, 6, 12, 20, …",
    options: ["28", "32", "30", "36"],
    correctAnswer: 2,
  },
  {
    section: "Design",
    questionText: "Which type category has small strokes at the ends of letters?",
    options: ["Sans-serif", "Grotesque", "Neo-grotesque", "Serif"],
    correctAnswer: 3,
  },
  {
    section: "Architecture",
    questionText: "On a 1:50 plan, a 5 m wall is drawn as…",
    options: ["10 cm", "5 cm", "25 cm", "50 cm"],
    correctAnswer: 0,
  },
  {
    section: "GK",
    questionText: "UCEED is conducted by which institute?",
    options: ["IIT Delhi", "IIT Bombay", "IIT Madras", "NID"],
    correctAnswer: 1,
  },
  {
    section: "Design",
    questionText: "Which of these is a subtractive primary colour?",
    options: ["Red", "Green", "Cyan", "Black"],
    correctAnswer: 2,
  },
];

// SAMPLE testimonials: replace with real student reviews before going live
const studentTestimonials = [
  { name: "Ananya Sharma", meta: "NIFT B.Des aspirant · Delhi", stars: 5, color: "#9333ea", text: "The CBT screen is almost the same as what I saw at the centre, so I wasn’t nervous about the interface on exam day. " },
  { name: "Rohan Iyer", meta: "UCEED aspirant · Chennai", stars: 5, color: "#1556f0", text: "I did the sectional tests daily for visualisation and logical reasoning. Seeing which section was dragging my accuracy down made my revision much more focused." },
  { name: "Priya Nair", meta: "NID DAT Prelims · Kochi", stars: 4, color: "#0f9d6c", text: "Good mix of questions and the answer review is quick. I would like a few more NID-specific papers, but for free practice it is genuinely useful." },
  { name: "Kabir Singh", meta: "CEED aspirant · Chandigarh", stars: 5, color: "#f59e0b", text: "Started with one mock a week and slowly moved to three. The analysis showed me where I was losing time, and that mattered more to me than the score itself." },
  { name: "Meera Joshi", meta: "NATA 2025 · Pune", stars: 5, color: "#e11d48", text: "The aptitude and maths sectionals were a good warm-up before my drawing practice. Works fine on my phone too, so I did a few quick sets in the bus." },
  { name: "Harsh Vardhan Gupta", meta: "CUET UG Design · Lucknow", stars: 4, color: "#0891b2", text: "The daily GK quiz is a nice habit. It takes under half an hour and stops current affairs from piling up. Would love more explanations with the studentAnswers." },
];

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const totalQuestions = sampleTestQuestions.length;
const prefersReduced = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Splits text into words so each one can slide up inside its own mask
function Words({ text }) {
  return text.split(" ").map((word, wordIndex) => (
    <span key={wordIndex}>
      <span className="w1"><span>{word}</span></span>{" "}
    </span>
  ));
}

// Number that counts up the first time it scrolls into view (and re-counts if the value changes)
function CountUp({ to, suffix = "" }) {
  const ref = useRef(null);
  const shown = useRef(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const run = () => {
      const animationCounter = { value: shown.current };
      gsap.to(animationCounter, {
        value: to,
        duration: prefersReduced() ? 0 : 1.4,
        ease: "power2.out",
        onUpdate: () => {
          shown.current = animationCounter.value;
          el.textContent = Math.round(animationCounter.value) + suffix;
        },
      });
    };
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        run();
        io.disconnect();
      }
    }, { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, [to, suffix]);

  return <b ref={ref}>{`0${suffix}`}</b>;
}

export default function Home({ embedded = false }) {
  const pageRootRef = useRef(null);
  const scrollProgressBarRef = useRef(null);
  const heroRef = useRef(null);
  const mockTestRef = useRef(null);
  const questionBoxRef = useRef(null);
  const examGridRef = useRef(null);
  const categoryIndicatorRef = useRef(null);
  const categoryButtonsRef = useRef({});
  const resultRingRef = useRef(null);
  const percentageTextRef = useRef(null);
  const faqHoverTimerRef = useRef(null);

  // REACT STATE: values that can change on the screen.
  // Exam list and selected category
  const [exams, setExams] = useState(defaultExamsData);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedExamForModal, setSelectedExamForModal] = useState(null);

  // These states control the sample mock test (CBT widget).
  // Interactive CBT widget
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [studentAnswers, setStudentAnswers] = useState(Array(totalQuestions).fill(-1));
  const [reviewMarkedQuestions, setReviewMarkedQuestions] = useState(Array(totalQuestions).fill(false));
  const [showInstantFeedback, setShowInstantFeedback] = useState(true);
  const [isMockTestSubmitted, setIsMockTestSubmitted] = useState(false);
  const [remainingTimeSeconds, setRemainingTimeSeconds] = useState(7182);

  // This state stores which FAQ answer is currently open.
  // FAQ
  const [openFaqIndex, setOpenFaqIndex] = useState(0);
  const [headlineWord, setHeadlineWord] = useState("growth");

  useEffect(() => {
    if (prefersReduced()) return;

    const words = ["growth", "progress", "scores", "streak"];
    let currentWord = "growth";
    let targetWord = "";
    let characterIndex = currentWord.length;
    let deleting = true;
    let timeoutId;

    function typeNextCharacter() {
      if (deleting) {
        characterIndex -= 1;
        setHeadlineWord(currentWord.slice(0, characterIndex));

        if (characterIndex === 0) {
          const nextWords = words.filter((word) => word !== currentWord);
          targetWord = nextWords[Math.floor(Math.random() * nextWords.length)];
          deleting = false;
          timeoutId = window.setTimeout(typeNextCharacter, 80);
          return;
        }

        timeoutId = window.setTimeout(typeNextCharacter, 28);
        return;
      }

      characterIndex += 1;
      setHeadlineWord(targetWord.slice(0, characterIndex));

      if (characterIndex === targetWord.length) {
        currentWord = targetWord;
        deleting = true;
        timeoutId = window.setTimeout(typeNextCharacter, 1100);
        return;
      }

      timeoutId = window.setTimeout(typeNextCharacter, 42);
    }

    timeoutId = window.setTimeout(typeNextCharacter, 1200);
    return () => window.clearTimeout(timeoutId);
  }, []);

  // useEffect runs this API request when the Home component first appears.
  /* ---------- data ---------- */
  useEffect(() => {
    async function loadData() {
      try {
        const res = await fetch(`${apiBaseUrl}/lms/test-series`);
        const data = await res.json();
        if (data.success && Array.isArray(data.exams) && data.exams.length > 0) {
          const loaded = data.exams.map((exam, index) => {
            const allPapers = [];
            (exam.subjects || []).forEach((subject) => {
              (subject.classifications || []).forEach((classification) => {
                (classification.papers || []).forEach((paper) => {
                  allPapers.push({
                    id: paper.id,
                    title: paper.title || `${exam.name} Paper`,
                    format: paper.format || "Full Mock",
                    duration: paper.durationMinutes ? `${paper.durationMinutes} Mins` : "120 Mins",
                    marks: paper.totalMarks ? `${paper.totalMarks} Marks` : "100 Marks",
                    questions: paper.questionCount ? `${paper.questionCount} Qs` : "50 Qs",
                    testUrl: paper.testUrl,
                  });
                });
              });
            });

            const lower = (exam.name || "").toLowerCase();
            let catName = "Design Entrance";
            let short = "NIFT";
            if (lower.includes("nata") || lower.includes("arch") || lower.includes("jee")) {
              catName = "Architecture";
              short = lower.includes("nata") ? "NATA" : "JEE";
            } else if (lower.includes("ceed") || lower.includes("m.des") || lower.includes("master")) {
              catName = "Master’s & PG";
              short = lower.includes("ceed") ? "CEED" : "NIFT";
            } else if (lower.includes("cuet") || lower.includes("fine art") || lower.includes("bfa")) {
              catName = "CUET & Fine Arts";
              short = lower.includes("cuet") ? "CUET" : "Fine";
            } else if (lower.includes("gk") || lower.includes("current") || lower.includes("affairs")) {
              catName = "General Knowledge";
              short = "GK";
            }

            return {
              id: exam.id || index + 1,
              name: exam.name,
              shortCode: short,
              category: catName,
              badge: "Active",
              description: exam.description || "Choose a phase, select a mock mode, read the instructions and start your CBT practice.",
              tags: ["CBT interface", "Timer", "Analysis"],
              papers: allPapers.length > 0 ? allPapers : (defaultExamsData[index % defaultExamsData.length]?.papers || []),
            };
          });
          setExams(loaded);
        }
      } catch (e) {
        // Keep defaultExamsData
      }
    }
    loadData();
  }, []);

  // Card heights changed -> recalculate scroll triggers
  useEffect(() => {
    const id = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(id);
  }, [exams]);

  /* ---------- scroll progress bar ---------- */
  useEffect(() => {
    const update = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const progressRatio = total > 0 ? Math.min(Math.max(window.scrollY / total, 0), 1) : 0;
      if (scrollProgressBarRef.current) scrollProgressBarRef.current.style.transform = `scaleX(${progressRatio})`;
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  /* ---------- GSAP: intro, reveals, magnetic buttons (skipped for reduced motion) ---------- */
  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add(
      "(prefers-reduced-motion: no-preference)",
      () => {
        const selectElements = gsap.utils.selector(pageRootRef);

        // The one orchestrated moment: hero intro
        gsap
          .timeline({ defaults: { ease: "power3.out" } })
          .from(selectElements(".w1 > span"), { yPercent: 110, rotate: 4, duration: 0.9, stagger: 0.07 }, 0.1)
          .from(selectElements(".hero-in"), { y: 24, opacity: 0, duration: 0.7, stagger: 0.1, clearProps: "opacity,transform" }, 0.35)
          .from(selectElements(".cbt"), { y: 40, opacity: 0, duration: 0.9, clearProps: "opacity" }, 0.3)
          .fromTo(selectElements(".scribble"), { clipPath: "inset(0 100% 0 0)" }, { clipPath: "inset(0 0% 0 0)", duration: 0.8, ease: "power2.inOut", clearProps: "clipPath" }, 0.95)
          .from(selectElements(".chip"), { scale: 0, duration: 0.6, ease: "back.out(2.5)", stagger: 0.15 }, 1.1);

        gsap.to(selectElements(".chip.c1"), { y: -8, duration: 2.2, yoyo: true, repeat: -1, ease: "sine.inOut" });
        gsap.to(selectElements(".chip.c2"), { y: 8, duration: 2.6, yoyo: true, repeat: -1, ease: "sine.inOut" });

        // Section reveals, batched as they scroll in
        const targets = selectElements(".sh, .cats, .grid .card, .f, .tcard, .faq-side, .qa, .band");
        gsap.set(targets, { y: 30, opacity: 0, transition: "none" });
        const reveal = (batch) =>
          gsap.to(batch, {
            y: 0,
            opacity: 1,
            duration: 0.7,
            stagger: 0.08,
            ease: "power3.out",
            overwrite: true,
            clearProps: "opacity,transform,transition",
          });
        ScrollTrigger.batch(targets, { start: "top 92%", once: true, onEnter: reveal, onLeave: reveal });

      },
      pageRootRef
    );
    return () => mm.revert();
  }, []);

  /* ---------- category indicator slides to the active pill ---------- */
  useEffect(() => {
    const btn = categoryButtonsRef.current[selectedCategory];
    if (!btn || !categoryIndicatorRef.current) return;
    gsap.to(categoryIndicatorRef.current, {
      y: btn.offsetTop - 10,
      duration: prefersReduced() ? 0 : 0.5,
      ease: "back.out(1.5)",
    });
  }, [selectedCategory]);

  /* ---------- cards re-enter when the category filter changes ---------- */
  const firstFilter = useRef(true);
  useEffect(() => {
    if (firstFilter.current) { firstFilter.current = false; return; }
    if (prefersReduced() || !examGridRef.current) return;
    gsap.fromTo(
      examGridRef.current.children,
      { y: 24, opacity: 0, scale: 0.96 },
      { y: 0, opacity: 1, scale: 1, duration: 0.5, stagger: 0.05, ease: "power3.out", clearProps: "opacity,transform" }
    );
  }, [selectedCategory]);

  /* ---------- FAQ: one open at a time, smooth height ---------- */
  const firstFaq = useRef(true);
  useEffect(() => {
    if (!pageRootRef.current) return;
    pageRootRef.current.querySelectorAll(".qa .a").forEach((el, i) => {
      gsap.to(el, {
        height: i === openFaqIndex ? "auto" : 0,
        duration: firstFaq.current || prefersReduced() ? 0 : 0.45,
        ease: "power3.inOut",
        overwrite: true,
      });
    });
    firstFaq.current = false;
  }, [openFaqIndex]);

  const faqEnter = (idx) => (e) => {
    if (e.pointerType === "touch") return;
    clearTimeout(faqHoverTimerRef.current);
    faqHoverTimerRef.current = setTimeout(() => setOpenFaqIndex(idx), 90); // small delay avoids flicker while sweeping
  };
  const faqLeave = () => clearTimeout(faqHoverTimerRef.current);

  /* ---------- CBT widget ---------- */
  useEffect(() => {
    if (isMockTestSubmitted) return;
    const id = setInterval(() => setRemainingTimeSeconds((p) => (p > 0 ? p - 1 : 0)), 1000);
    return () => clearInterval(id);
  }, [isMockTestSubmitted]);

  const formatTimer = (remainingSeconds) =>
    [Math.floor(remainingSeconds / 3600), Math.floor((remainingSeconds % 3600) / 60), remainingSeconds % 60].map((v) => String(v).padStart(2, "0")).join(":");

  // Calculate correct and wrong answers using a simple for loop.
  let correct = 0;
  let wrong = 0;

  for (let i = 0; i < studentAnswers.length; i++) {
    if (studentAnswers[i] !== -1) {
      if (studentAnswers[i] === sampleTestQuestions[i].correctAnswer) {
        correct = correct + 1;
      } else {
        wrong = wrong + 1;
      }
    }
  }
  const totalAnswered = correct + wrong;
  const score = correct * 4 - wrong;
  const accuracy = totalAnswered > 0 ? Math.round((correct / totalAnswered) * 100) : 0;

  // Save the option selected by the student.
  // First copy the answers array, then update the current question.
  function handleSelectAnswer(optIdx) {
    if (isMockTestSubmitted) return;

    const updatedAnswers = [...studentAnswers];
    updatedAnswers[currentQuestionIndex] = optIdx;
    setStudentAnswers(updatedAnswers);
  }

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex === totalQuestions - 1) {
      setIsMockTestSubmitted(true);
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };
  // Mark or unmark the current question for review.
  const handleToggleReviewMark = () => {
    const updatedMarked = [...reviewMarkedQuestions];
    updatedMarked[currentQuestionIndex] = !updatedMarked[currentQuestionIndex];
    setReviewMarkedQuestions(updatedMarked);
  };
  // Reset the mock test so the user can attempt it again.
  const handleResetMockTest = () => {
    setCurrentQuestionIndex(0);
    setStudentAnswers(Array(totalQuestions).fill(-1));
    setReviewMarkedQuestions(Array(totalQuestions).fill(false));
    setRemainingTimeSeconds(7182);
    setIsMockTestSubmitted(false);
  };

  // Question slides in from the direction you navigated
  const previousQuestionIndex = useRef(0);
  useEffect(() => {
    if (currentQuestionIndex !== previousQuestionIndex.current && questionBoxRef.current && !prefersReduced()) {
      const dir = currentQuestionIndex > previousQuestionIndex.current ? 1 : -1;
      gsap.fromTo(questionBoxRef.current, { x: dir * 28, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4, ease: "power3.out", clearProps: "transform,opacity" });
    }
    previousQuestionIndex.current = currentQuestionIndex;
  }, [currentQuestionIndex]);

  const currentQuestion = sampleTestQuestions[currentQuestionIndex];
  const selectedAnswerIndex = studentAnswers[currentQuestionIndex];
  const isCorrect = selectedAnswerIndex === currentQuestion.correctAnswer;
  const showFeedback = showInstantFeedback && selectedAnswerIndex >= 0;

  // The picked letter pops
  useEffect(() => {
    if (selectedAnswerIndex < 0 || prefersReduced()) return;
    const el = mockTestRef.current?.querySelector(".opt.on i");
    if (el) gsap.fromTo(el, { scale: 0.5 }, { scale: 1, duration: 0.5, ease: "back.out(3)" });
  }, [selectedAnswerIndex, currentQuestionIndex]);

  // Result screen: ring + number + section bars
  useEffect(() => {
    if (!isMockTestSubmitted) return;
    const scorePercentage = Math.round((correct / totalQuestions) * 100);
    const reducedMotion = prefersReduced();
    const percentageAnimation = { value: 0 };
    gsap.to(percentageAnimation, {
      value: scorePercentage,
      duration: reducedMotion ? 0 : 1.2,
      ease: "power3.out",
      onUpdate: () => {
        if (percentageTextRef.current) percentageTextRef.current.textContent = `${Math.round(percentageAnimation.value)}%`;
        if (resultRingRef.current) resultRingRef.current.style.strokeDashoffset = 326.7 * (1 - percentageAnimation.value / 100);
      },
    });
    if (!reducedMotion) gsap.from(mockTestRef.current.querySelectorAll(".bars u"), { scaleX: 0, duration: 0.8, delay: 0.3, stagger: 0.1, ease: "power3.out" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMockTestSubmitted]);

  const getSectionBreakdown = () => {
    const groups = {};
    sampleTestQuestions.forEach((questionItem, questionIndex) => {
      if (!groups[questionItem.section]) groups[questionItem.section] = { total: 0, correct: 0 };
      groups[questionItem.section].total += 1;
      if (studentAnswers[questionIndex] === questionItem.correctAnswer) groups[questionItem.section].correct += 1;
    });
    return groups;
  };

  /* ---------- hero: cursor light + panel tilt ---------- */
  const handleHeroMouseMove = (e) => {
    if (!heroRef.current || prefersReduced() || e.pointerType === "touch") return;
    const r = heroRef.current.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    heroRef.current.style.setProperty("--mx", `${x * 100}%`);
    heroRef.current.style.setProperty("--my", `${y * 100}%`);
    gsap.to(mockTestRef.current, { rotateY: (x - 0.5) * 8, rotateX: (0.5 - y) * 6, transformPerspective: 900, duration: 0.8, ease: "power2.out", overwrite: "auto" });
  };
  const handleHeroMouseLeave = () =>
    gsap.to(mockTestRef.current, { rotateX: 0, rotateY: 0, duration: 1, ease: "elastic.out(1,.5)", overwrite: "auto" });

  /* ---------- exam cards: glow follows cursor, 3D tilt ---------- */
  const handleCardMove = (e) => {
    if (e.pointerType === "touch" || prefersReduced()) return;
    const c = e.currentTarget;
    const r = c.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    c.style.setProperty("--x", `${x}px`);
    c.style.setProperty("--y", `${y}px`);
    gsap.to(c, { rotateY: (x / r.width - 0.5) * 10, rotateX: (0.5 - y / r.height) * 10, transformPerspective: 900, duration: 0.5, ease: "power2.out", overwrite: "auto" });
  };
  const handleCardEnter = (e) => {
    if (e.pointerType === "touch" || prefersReduced()) return;
    gsap.to(e.currentTarget, { y: -8, duration: 0.4, ease: "power3.out", overwrite: "auto" });
  };
  const handleCardLeave = (e) => {
    if (prefersReduced()) return;
    gsap.to(e.currentTarget, { y: 0, rotateX: 0, rotateY: 0, duration: 0.6, ease: "elastic.out(1,.6)", overwrite: "auto" });
  };
  /* ---------- exam modal ---------- */

  // Calculate the exams and paper counts shown on the page.
  /* ---------- derived data ---------- */
  const filteredExamList = exams.filter((exam) =>
    selectedCategory === "All" || exam.category === selectedCategory
  );
  const getCategoryCount = (categoryName) => (categoryName === "All" ? exams.length : exams.filter((exam) => exam.category === categoryName).length);
  // Count all papers across every exam.
  let totalPapers = 0;
  for (let i = 0; i < exams.length; i++) {
    if (exams[i].papers) {
      totalPapers = totalPapers + exams[i].papers.length;
    }
  }
  const goExams = (e) => {
    e?.preventDefault();
    document.getElementById("exams")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className={`${inter.className} home-page-root`} ref={pageRootRef} data-embedded={embedded || undefined}>
      <div className="home-fireflies" aria-hidden="true">
        <span /><span /><span /><span /><span /><span />
        <span /><span /><span /><span /><span /><span />
      </div>
      <style jsx global>{`
        .home-page-root,
        .home-page-root * {
          font-family: ${inter.style.fontFamily}, sans-serif !important;
        }

        /* Compact hero typography and spacing */
        .home-page-root .home-hero h1 {
          font-size: clamp(2.35rem, 4.2vw, 3.8rem) !important;
          line-height: 1.04 !important;
          letter-spacing: -0.045em !important;
          margin: 0 0 12px !important;
          max-width: 100%;
        }

        .home-page-root .home-hero .hero-title-line {
          display: block;
          white-space: nowrap;
          width: max-content;
          max-width: 100%;
        }

        .home-page-root .home-hero .hero-title-line .w1 {
          display: inline-block;
        }

        .home-page-root .typewriter-cursor {
          display: inline-block;
          height: 0.85em;
          margin-left: 0.06em;
          border-left: 0.07em solid currentColor;
          vertical-align: -0.05em;
          animation: hero-typewriter-caret 700ms steps(2, end) infinite;
        }

        @keyframes hero-typewriter-caret {
          50% {
            opacity: 0;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .home-page-root .typewriter-cursor {
            animation: none;
          }
        }

        .home-page-root .home-hero .hero-title-line + .hero-title-line {
          margin-top: 8px;
        }

        .home-page-root .home-hero .lead {
          margin-top: 16px !important;
          margin-bottom: 18px !important;
        }

        .home-page-root .home-hero .cta {
          margin-top: 16px !important;
        }

        .home-page-root .home-hero .quick {
          margin-top: 12px !important;
        }

        .home-page-root .home-hero .stats {
          margin-top: 16px !important;
        }

        /* FAQ matches the full content width used by the other sections */
        .home-page-root #faq .faq-grid {
          width: 100% !important;
          max-width: none !important;
          align-items: stretch !important;
        }

        .home-page-root #faq .faq-side {
          width: 100% !important;
          max-width: none !important;
          text-align: center !important;
          display: flex;
          justify-content: center;
        }

        .home-page-root #faq .faq-side h2 {
          width: 100%;
          text-align: center !important;
        }

        .home-page-root #faq .faq-list {
          width: 100% !important;
          max-width: none !important;
        }

        @media (max-width: 640px) {
          .home-page-root .home-hero h1 {
            font-size: clamp(2rem, 8vw, 3rem) !important;
          }
        }
      `}</style>
      <div className="pd-bar" ref={scrollProgressBarRef} aria-hidden="true" />

      <main className="wrap pt-20 pb-16">
        {/* 1. HERO */}
        <div className="home-hero" ref={heroRef} id="hero" onPointerMove={handleHeroMouseMove} onPointerLeave={handleHeroMouseLeave}>
          <div className="hero-grid" aria-hidden="true" />
          <i className="cm tl" aria-hidden="true" /><i className="cm tr" aria-hidden="true" />
          <i className="cm bl" aria-hidden="true" /><i className="cm br" aria-hidden="true" />
          <div>
            <span className="pill hero-in mb-4"><i />Free mock tests, no login needed</span>

            <h1 style={simpleHeadingStyle} aria-label="Practice smarter. Track your growth.">
              <span aria-hidden="true">
                <span className="hero-title-line">
                  <Words text="Practice smarter" />
                </span>
                <span className="c hero-title-line">
                  <span className="u">
                    <Words text="Track your" />
                    <span>{headlineWord}</span>
                    <span className="typewriter-cursor" aria-hidden="true" />
                    <svg className="scribble" viewBox="0 0 300 14" preserveAspectRatio="none"><path d="M3 9C60 2 120 13 180 6S270 4 297 8" /></svg>
                  </span>
                </span>
              </span>
            </h1>

            <p className="lead hero-in">
              Pick your exam, run a full or sectional CBT with a live timer, and see your score and answer review the moment you submit.
            </p>

            <div className="cta hero-in">
              <a className="btn p" href="#exams" onClick={goExams}>
                <span>Start practising</span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"><path d="M5 12h14m-6-6 6 6-6 6" /></svg>
              </a>
              <a className="btn g" href="#exams" onClick={goExams}>Explore exams</a>
            </div>

            <div className="quick hero-in">
              <button type="button" onClick={() => { setSelectedCategory("General Knowledge"); goExams(); }}>Daily GK quiz</button>
            </div>

            <div className="stats mt-4">
              <div><CountUp to={exams.length} /><span>Available exams</span></div>
              <div><CountUp to={totalPapers} /><span>Practice papers</span></div>
            </div>
          </div>

          {/* Live CBT widget */}
          <div className="stage">
            <i className="sheet s1" aria-hidden="true" /><i className="sheet s2" aria-hidden="true" />
            <div className="swatches" aria-hidden="true"><i style={{ background: "#1556f0" }} /><i style={{ background: "#4de3f7" }} /><i style={{ background: "#f59e0b" }} /><i style={{ background: "#9333ea" }} /></div>
            <div className="cbt" ref={mockTestRef} id="cbt" aria-label="Sample mock test">
              <div className="cbt-h">
                <span><b>NIFT B.Des · Mock 1</b><span className="sec">{currentQuestion.section}</span></span>
                <span className="timer">{formatTimer(remainingTimeSeconds)}</span>
              </div>

              <div className="prog"><i style={{ width: `${(totalAnswered / totalQuestions) * 100}%` }} /></div>

              <div className="qm">
                <span>Question {currentQuestionIndex + 1} of {totalQuestions}</span>
                <span>+4 correct · −1 wrong</span>
              </div>

              <div className="qb" ref={questionBoxRef}>
                <div className="q">{currentQuestion.questionText}</div>
                <div className="opts">
                  {currentQuestion.options.map((optText, optIdx) => {
                    let cls = "opt";
                    if (selectedAnswerIndex === optIdx) cls += " on";
                    if (showFeedback) {
                      if (optIdx === currentQuestion.correctAnswer) cls += " ok";
                      else if (selectedAnswerIndex === optIdx) cls += " no";
                    }
                    return (
                      <button key={optIdx} type="button" className={cls} onClick={() => handleSelectAnswer(optIdx)}>
                        <i>{"ABCD"[optIdx]}</i>
                        <span>{optText}</span>
                      </button>
                    );
                  })}
                </div>
                <div className={`fb ${showFeedback ? (isCorrect ? "g" : "r") : ""}`} aria-live="polite">
                  {showFeedback && (isCorrect ? "Correct  +4" : `Incorrect  −1 · answer: ${currentQuestion.options[currentQuestion.correctAnswer]}`)}
                </div>
              </div>

              <div className="nav2">
                <button type="button" className="nb" onClick={handlePreviousQuestion} disabled={currentQuestionIndex === 0}>Previous</button>
                <button type="button" className={`nb ${reviewMarkedQuestions[currentQuestionIndex] ? "on" : ""}`} onClick={handleToggleReviewMark}>
                  {reviewMarkedQuestions[currentQuestionIndex] ? "Marked ✓" : "Mark for review"}
                </button>
                <button type="button" className="nb pr" onClick={handleNextQuestion}>{currentQuestionIndex === totalQuestions - 1 ? "Submit" : "Next"}</button>
              </div>

              <div className="pal">
                {sampleTestQuestions.map((_, i) => {
                  let cls = "";
                  if (studentAnswers[i] >= 0) cls += " a";
                  if (reviewMarkedQuestions[i]) cls += " m";
                  if (i === currentQuestionIndex) cls += " c";
                  return (
                    <button key={i} type="button" className={cls.trim()} onClick={() => setCurrentQuestionIndex(i)} aria-label={`Go to question ${i + 1}`}>
                      {i + 1}
                    </button>
                  );
                })}
              </div>

              <div className="f2">
                <label className="sw">
                  <input type="checkbox" checked={showInstantFeedback} onChange={(e) => setShowInstantFeedback(e.target.checked)} />
                  <span className="trk" />
                  Instant feedback
                </label>
              </div>

              <div className="chip c1">Score <b>{score > 0 ? `+${score}` : score}</b></div>
              <div className="chip c2">Accuracy <b>{totalAnswered > 0 ? `${accuracy}%` : "—"}</b></div>

              <div className={`res ${isMockTestSubmitted ? "show" : ""}`}>
                {isMockTestSubmitted && (
                  <>
                    <div className="ring">
                      <svg viewBox="0 0 120 120">
                        <circle className="t" cx="60" cy="60" r="52" />
                        <circle className="v" ref={resultRingRef} cx="60" cy="60" r="52" strokeDasharray="326.7" style={{ strokeDashoffset: 326.7 }} />
                      </svg>
                      <b ref={percentageTextRef}>0%</b>
                    </div>
                    <strong>Score {score} of {totalQuestions * 4}</strong>
                    <div className="rs">
                      <div><b>{correct}</b>Correct</div>
                      <div><b>{wrong}</b>Wrong</div>
                      <div><b>{totalQuestions - totalAnswered}</b>Skipped</div>
                    </div>
                    <div className="bars">
                      {Object.entries(getSectionBreakdown()).map(([name, d]) => (
                        <div key={name} style={{ display: "contents" }}>
                          <span>{name}</span>
                          <i><u style={{ "--w": `${(d.correct / d.total) * 100}%` }} /></i>
                          <em>{d.correct}/{d.total}</em>
                        </div>
                      ))}
                    </div>
                    <button type="button" className="nb pr" onClick={handleResetMockTest} style={{ flex: "none", width: "100%" }}>Try again</button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* 2. MARQUEE */}
        <div className="mq" aria-hidden="true">
          <div>{[...exams, ...exams].map((ex, i) => <span key={i}>{ex.name.split(" (")[0]}</span>)}</div>
        </div>

        {/* 3. CHOOSE YOUR EXAM */}
        <section id="exams" className="home-section">
          <div className="sh">
            <div>
              <h2>Choose your exam</h2>
              <p>Select a phase, pick full or sectional mode, and start.</p>
            </div>

          </div>

          <div className="layout">
            <div className="cats" role="tablist">
              <span className="ind" ref={categoryIndicatorRef} aria-hidden="true" />
              {examCategories.map((category) => (
                <button
                  key={category.label}
                  type="button"
                  role="tab"
                  aria-selected={selectedCategory === category.label}
                  ref={(el) => { categoryButtonsRef.current[category.label] = el; }}
                  className={selectedCategory === category.label ? "on" : ""}
                  onClick={() => setSelectedCategory(category.label)}
                >
                  <span>{category.label}</span>
                  <em>{getCategoryCount(category.label)}</em>
                </button>
              ))}
            </div>

            <div>
              {filteredExamList.length > 0 ? (
                <div className="grid" ref={examGridRef}>
                  {filteredExamList.map((exam) => (
                    <article key={exam.id} className="card" onPointerMove={handleCardMove} onPointerEnter={handleCardEnter} onPointerLeave={handleCardLeave}>
                      <div className="top">
                        <span className="logo">{exam.shortCode || "PD"}</span>
                        <span className="live"><i />Active</span>
                      </div>
                      <span className="cat">{exam.category}</span>
                      <h3>{exam.name}</h3>
                      <p>{exam.description}</p>
                      <div className="tags">{(exam.tags || []).map((t, i) => <span key={i}>{t}</span>)}</div>

                      <button type="button" className="ghost" onClick={() => setSelectedExamForModal(exam)}>
                        View papers ({exam.papers?.length || 0})
                      </button>
                      <Link className="solid" href={`/resgister?paperId=${encodeURIComponent(exam.papers?.[0]?.id || exam.id)}`}>
                        <span>Start mock</span>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"><path d="M5 12h14m-6-6 6 6-6 6" /></svg>
                      </Link>

                      <svg className="wave" viewBox="0 0 400 60" fill="currentColor" preserveAspectRatio="none" aria-hidden="true">
                        <path d="M0 40C80 5 160 5 240 30s120 20 160-5v35H0z" />
                      </svg>
                    </article>
                  ))}
                </div>
              ) : (
                <div className="none" style={{ display: "block" }}>No exams available in this category yet.</div>
              )}
            </div>
          </div>
        </section>

        {/* 4. WHY CHOOSE */}
        <section id="why" className="home-section">
          <div className="sh">
            <div>
              <h2>Why choose Pahal Design?</h2>
              <p>Exam-style tests, instant scoring and clear insight into what to fix next.</p>
            </div>
          </div>
          <div className="feat">
            {featureList.map((feature, featureIndex) => (
              <div key={featureIndex} className="f" style={{ "--c": feature.color }}>
                <div className="ic">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d={feature.path} /></svg>
                </div>
                <h3>{feature.title}</h3>
                <p>{feature.desc}</p>
                <em>{feature.pill}</em>
              </div>
            ))}
          </div>
        </section>

        {/* 5. testimonials (sample content: swap for real student reviews) */}
        <section id="reviews" className="home-section">
          <div className="sh">
            <div>
              <h2>Students on Pahal Design</h2>
              <p>What aspirants say after practising for design and architecture entrances.</p>
            </div>
          </div>
          <div className="tm-grid">
            {studentTestimonials.map((t, i) => (
              <figure key={i} className="tcard" style={{ "--c": t.color }}>
                <svg className="qi" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7.2 6C4.9 7.4 3.5 9.7 3.5 12.6V18h6v-6H6.3c.1-1.6.9-2.8 2.4-3.6zm9.5 0c-2.3 1.4-3.7 3.7-3.7 6.6V18h6v-6h-3.2c.1-1.6.9-2.8 2.4-3.6z" /></svg>
                <div className="stars" role="img" aria-label={`${t.stars} out of 5 stars`}>
                  {[0, 1, 2, 3, 4].map((s) => (
                    <svg key={s} viewBox="0 0 24 24" fill={s < t.stars ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"><path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z" /></svg>
                  ))}
                </div>
                <blockquote><p>{t.text}</p></blockquote>
                <figcaption className="who">
                  <span className="av">{t.name.split(" ")[0][0]}{t.name.split(" ").slice(-1)[0][0]}</span>
                  <span><b>{t.name}</b><small>{t.meta}</small></span>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        {/* 6. FAQ: same width as the other sections, hover opens one and closes the rest */}
        <section className="faq home-section" id="faq">
          <div className="faq-grid" style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            <div className="faq-side">
              <h2>Frequently asked questions</h2>
            </div>
            <div className="faq-list">
              {faqItems.map((item, idx) => {
                const isOpen = openFaqIndex === idx;
                return (
                  <div key={idx} className={`qa ${isOpen ? "o" : ""}`} onPointerEnter={faqEnter(idx)} onPointerLeave={faqLeave}>
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      onClick={() => setOpenFaqIndex(isOpen ? -1 : idx)}
                      onFocus={(e) => e.currentTarget.matches(":focus-visible") && setOpenFaqIndex(idx)}
                    >
                      <span>{item.q}</span>
                      <span className="pm" aria-hidden="true">{isOpen ? "−" : "+"}</span>
                    </button>
                    <div className="a"><p>{item.a}</p></div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 7. CTA BAND */}
        <section className="home-section">
          <div className="band">
            <div>
              <span className="pill" style={{ color: "var(--bt)", borderColor: "var(--hov)", background: "var(--card)" }}>Free online exam practice</span>
              <h2>Practise exam-level mocks for NIFT, NID, UCEED and more</h2>
              <p>Free CBT-style mock tests, sectional practice, previous year papers and detailed performance reports.</p>
              <div className="cta">
                <a className="btn p" href="#exams" onClick={goExams}>Start free practice</a>
                <a className="btn g" href="#exams" onClick={goExams}>View all test series</a>
              </div>
            </div>
            <div className="mini">
              <div><CountUp to={14} suffix="+" />Active exams</div>
              <div><b>CBT</b>Exam interface</div>
              <div><CountUp to={100} suffix="%" />Real pattern</div>
            </div>
          </div>
        </section>
      </main>

      {/* 8. VIEW PAPERS MODAL */}
      {selectedExamForModal && (
        <div className="modal-overlay" onClick={() => setSelectedExamForModal(null)}>
          <div className="modal-dialog" role="dialog" aria-modal="true" aria-label={`${selectedExamForModal.name} papers`} onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div>
                <span className="cat" style={{ margin: "0 0 6px 0" }}>{selectedExamForModal.category}</span>
                <h3>{selectedExamForModal.name}</h3>
                <p style={{ color: "var(--mut)", fontSize: "0.85rem", marginTop: "4px" }}>
                  Available Mock Tests &amp; Practice Papers ({selectedExamForModal.papers?.length || 0})
                </p>
              </div>
              <button type="button" className="modal-close" onClick={() => setSelectedExamForModal(null)} aria-label="Close modal">
                <X size={18} />
              </button>
            </div>

            <div>
              {selectedExamForModal.papers && selectedExamForModal.papers.length > 0 ? (
                selectedExamForModal.papers.map((paper) => (
                  <div key={paper.id} className="paper-item">
                    <div>
                      <h4>{paper.title}</h4>
                      <div className="paper-meta">
                        <span className="paper-badge">{paper.format}</span>
                        <span className="paper-badge">{paper.duration}</span>
                        <span className="paper-badge">{paper.marks}</span>
                        <span className="paper-badge">{paper.questions}</span>
                      </div>
                    </div>
                    <Link href={`/resgister?paperId=${encodeURIComponent(paper.id)}`} className="btn p" style={{ padding: "8px 16px", fontSize: "0.85rem" }} onClick={() => setSelectedExamForModal(null)}>
                      <span>Start Paper</span>
                      <ArrowRight size={14} />
                    </Link>
                  </div>
                ))
              ) : (
                <p style={{ color: "var(--mut)", padding: "20px 0" }}>No papers available currently for this exam.</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}