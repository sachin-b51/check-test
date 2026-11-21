
import PricingCard from "../components/PricingCard";

export default function About() {
  const courses = [
    {
      title: "Foundation Program",
      description:
        "Build strong fundamentals in creativity, drawing, observation, and visual communication.",
      label: "Ideal for beginners",
    },
    {
      title: "Entrance Exam Preparation",
      description:
        "Prepare for design entrance examinations with structured lessons and targeted practice.",
      label: "Exam-focused learning",
    },
    {
      title: "Mock Test Program",
      description:
        "Practice timed tests, identify areas for improvement, and build exam confidence.",
      label: "Practice & performance",
    },
    {
      title: "Advanced Mentorship",
      description:
        "Get focused guidance to refine your skills and improve your overall preparation strategy.",
      label: "Personalized guidance",
    },
  ];

  const pricingPlans = [
    {
      name: "FREE PLAN",
      price: "₹0",
      features: [
        "1 Free Official PYQ for every entrance exam",
        "Instant GAT Auto-Grading & Detailed Analysis",
        "All-India Rank (AIR) & Percentile Ranking",
        "Free basic study materials & blueprints",
      ],
    },
    {
      name: "BASIC PLAN",
      price: "₹2,999",
      features: [
        "Top 5 Full-Length Standard Mock Tests",
        "NIFT, UCEED, CEED & CUET UG coverage",
        "Step-by-step answer explanations & distractor analysis",
        "Timed CBT exam simulator with negative marking",
        "Question-wise speed and performance analytics",
      ],
    },
    {
      name: "ADVANCE PLAN",
      price: "₹4,999",
      features: [
        "Previous Year Question Papers (2015–2026)",
        "Top 10 Full-Length Standard Mock Tests",
        "Personalized Mentor Drawing Feedback",
        "Expert evaluation of perspective and linework",
        "Step-by-step GAT and design aptitude solutions",
        "All study materials and revision notes",
      ],
    },
  ];

  return (
    <main className="mt-16 sm:mt-18 lg:mt-20 min-h-screen w-full bg-slate-50 px-3.5 sm:px-6 md:px-10 py-6 sm:py-8 md:py-10">

      {/* Courses Heading */}
      <div className="mx-auto max-w-5xl text-center px-1">
        <p className="text-xs sm:text-sm font-bold uppercase tracking-widest text-blue-600">
          Courses & Programs
        </p>

        <h1 className="mt-2.5 sm:mt-3 text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-slate-950">
          Choose Your Design Preparation Program
        </h1>

        <p className="mt-3 sm:mt-4 text-xs sm:text-sm text-slate-500 max-w-2xl mx-auto">
          Find the right preparation pathway for your goals,
          strengthen your creative abilities, and work towards
          your dream design college.
        </p>
      </div>

      {/* Courses Cards */}
      <section className="mx-auto mt-8 sm:mt-10 lg:mt-12 max-w-6xl">
        <div className="grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-2">
          {courses.map((course) => (
            <div
              key={course.title}
              className="flex flex-col rounded-2xl border border-slate-300 bg-white p-5 sm:p-6 shadow-sm "
            >
              <h2 className="text-lg sm:text-xl lg:text-2xl font-bold leading-6 sm:leading-7 text-slate-900">
                {course.title}
              </h2>

              <p className="mt-2.5 sm:mt-3 flex-1 text-xs sm:text-sm lg:text-base leading-5 sm:leading-6 text-slate-500">
                {course.description}
              </p>

              <div className="mt-5 sm:mt-6 border-t border-slate-200 pt-3.5 sm:pt-4">
                <span className="text-xs sm:text-sm font-semibold text-blue-600">
                  {course.label}
                </span>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-6 sm:mt-8 text-center text-[11px] sm:text-xs leading-4.5 sm:leading-5 text-slate-400">
          Course availability, fees, duration, and included features
          should be confirmed with Pahal Design before publishing.
        </p>
      </section>

      {/* Pricing Heading */}
      <section className="mx-auto mt-12 sm:mt-16 lg:mt-20 w-full max-w-[1200px]">
        <div className="text-center px-1">
          <p className="text-xs sm:text-sm font-bold uppercase tracking-widest text-blue-600">
            Plans & Learning Options
          </p>

          <h2 className="mt-2.5 sm:mt-3 text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-slate-950">
            Find the Right Path to Design Success
          </h2>

          <p className="mt-3 sm:mt-4 text-xs sm:text-sm text-slate-500 max-w-2xl mx-auto">
            Explore flexible learning options tailored to your preparation
            goals. Compare programs and access the practice tests and
            study resources you need to move forward.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="mx-auto mt-8 sm:mt-10 lg:mt-15 grid w-full items-stretch gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-15">
          {pricingPlans.map((plan) => (
            <PricingCard
              key={plan.name}
              name={plan.name}
              price={plan.price}
              features={plan.features}
            />
          ))}
        </div>
        
        <div className="mx-auto mt-12 sm:mt-16 lg:mt-20 w-full max-w-[1200px] flex flex-col sm:flex-row gap-5 sm:gap-6 rounded-2xl bg-blue-600 p-5 sm:p-6 lg:p-8 text-white items-center justify-between text-center sm:text-left">

          <div className="max-w-2xl">
            <h2 className="text-lg sm:text-xl lg:text-2xl font-bold">
              Ready to start your design journey?
            </h2>

            <p className="mt-2 sm:mt-3 text-xs sm:text-sm leading-5 sm:leading-6 text-blue-100">
              Get expert guidance on entrance exams, portfolio
              preparation and choosing the right design college.
            </p>
          </div>

          <a
            href="https://wa.me/918750591056"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center justify-center gap-2 text-blue-900 rounded-xl border bg-white border-white/40 px-4 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold transition hover:bg-blue-900 hover:text-white"
          >
            <span>Chat on WhatsApp</span>
            <span aria-hidden="true">↗</span>
          </a>

        </div>

      </section>
    </main>
  );
}
