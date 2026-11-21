import { Heart, Phone, ShieldCheck } from "lucide-react";

function Footer() {
  return (
    <footer id="contact" className="pd-footer w-full bg-[#0b1530] text-slate-300 border-t border-slate-800/80 mt-16 sm:mt-20">
      <div className="pd-wrap mx-auto max-w-[1520px] px-5 sm:px-8 md:px-12 lg:px-16 xl:px-24 pt-12 sm:pt-16 pb-8">
        {/* Footer Columns */}
        <div className="pd-fg grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-8">
          {/* Column 1: Brand */}
          <div>
            <a href="#" className="pd-brand mb-5 inline-flex items-center gap-3 no-underline">
              <span className="flex h-8 w-8 items-center justify-center rounded-md border-2 border-white bg-blue-600 text-sm font-bold text-white shadow-sm">
                PD
              </span>
              <span className="text-lg font-bold text-white underline decoration-blue-500 decoration-4 underline-offset-4">
                Pahal Design
              </span>
            </a>

            <p className="pd-fabout max-w-[320px] text-[13px] font-medium leading-[22px] text-slate-400">
              India&apos;s leading entrance preparation &amp; mock test platform for NIFT, NID, UCEED, CEED, and
              NATA aspirants. Built by educators for future designers.
            </p>
          </div>

          {/* Column 2: Preparation */}
          <div>
            <h4 className="mb-4 text-xs font-bold uppercase tracking-wider text-white">
              Preparation
            </h4>
            <ul className="space-y-2.5 text-[13px] font-medium text-slate-400">
              <li>
                <a href="#mock-tests" className="pd-fl transition-colors hover:text-white">
                  Mock Tests Catalog
                </a>
              </li>
              <li>
                <a href="#course-material" className="pd-fl transition-colors hover:text-white">
                  Course Material
                </a>
              </li>
              <li>
                <a href="#study-resources" className="pd-fl transition-colors hover:text-white">
                  Free Study Resources
                </a>
              </li>
              <li>
                <a href="#about" className="pd-fl transition-colors hover:text-white">
                  About Test Village
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Course Activation */}
          <div>
            <h4 className="mb-4 text-xs font-bold uppercase tracking-wider text-white">
              Course Activation
            </h4>
            <p className="text-[13px] font-medium leading-[22px] text-slate-400">
              Have you registered? Contact us on WhatsApp directly at +91 8750591056 or email us at{" "}
              <a href="mailto:mail@testvillage.com" className="text-slate-300 underline hover:text-white">
                mail@testvillage.com
              </a>.
            </p>

            <a
              href="https://wa.me/918750591056"
              target="_blank"
              rel="noreferrer"
              className="pd-wa mt-4 inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-3.5 py-2 text-xs font-bold text-white shadow-sm transition-colors hover:bg-emerald-700"
            >
              <Phone size={14} />
              Contact +91 8750591056
            </a>
          </div>

          {/* Column 4: Academy Staff */}
          <div>
            <h4 className="mb-4 text-xs font-bold uppercase tracking-wider text-white">
              Academy Staff
            </h4>
            <p className="text-[13px] font-medium leading-[22px] text-slate-400">
              Log in as a design reviewer or administrator to review drawing canvases, post feedback, and manage
              MCQ questionnaires.
            </p>

            <a
              href="#staff-login"
              className="pd-staff mt-4 inline-flex items-center gap-2 text-xs font-bold text-blue-400 underline decoration-blue-400/50 underline-offset-2 transition-colors hover:text-blue-300 hover:decoration-blue-300"
            >
              <ShieldCheck size={16} />
              Staff / Admin Portal Login
            </a>
          </div>
        </div>

        <div className="mt-12 border-t border-slate-800/80" />

        {/* Bottom Footer */}
        <div className="pd-copy flex flex-col gap-4 pt-6 text-xs text-slate-400 md:flex-row md:items-center md:justify-between text-center md:text-left">
          <span>© 2026 Test Village. All rights reserved. (mail@testvillage.com)</span>

          <span className="pd-made inline-flex items-center justify-center gap-1.5">
            Made with
            <Heart size={14} className="pd-heart fill-red-500 text-red-500 inline" aria-label="love" />
            for Design Students in India
          </span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
