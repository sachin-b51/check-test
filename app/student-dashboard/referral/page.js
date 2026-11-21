"use client";

import { useState } from "react";
import {
  Check,
  Clipboard,
  Gift,
  Link2,
  MousePointerClick,
  Share2,
  UserRoundPlus,
  Wallet,
} from "lucide-react";

const referralCode = "PAHAL2027";
const referralPath = `/about?ref=${referralCode}`;

const referralStats = [
  { title: "Clicks", value: "2,415", icon: MousePointerClick },
  { title: "Converted users", value: "87", icon: UserRoundPlus },
  { title: "Commission (total)", value: "₹1,345", icon: Wallet },
  { title: "Commission (pending)", value: "₹522", icon: Gift },
];

export default function ReferralPage() {
  const [copiedText, setCopiedText] = useState("");
  const [statusMessage, setStatusMessage] = useState("");

  async function copyToClipboard(text, name) {
    try {
      let textToCopy = text;
      if (name === "Referral link") {
        textToCopy = new URL(text, window.location.origin).toString();
      }

      await navigator.clipboard.writeText(textToCopy);
      setCopiedText(name);
      setStatusMessage(`${name} copied.`);
    } catch {
      setCopiedText("");
      setStatusMessage("Could not copy. Please try again.");
    }

    window.setTimeout(() => setCopiedText(""), 2000);
  }

  async function shareReferralLink() {
    const fullLink = new URL(referralPath, window.location.origin).toString();

    if (navigator.share) {
      try {
        await navigator.share({
          title: "Join me on Pahal Test",
          text: `Use my referral code ${referralCode} to get 20% off.`,
          url: fullLink,
        });
        setStatusMessage("");
        return;
      } catch (error) {
        if (error.name === "AbortError") return;
      }
    }

    await copyToClipboard(referralPath, "Referral link");
  }

  return (
    <main className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
      <header className="mb-4 border-b border-slate-100 pb-3">
        <h1 className="flex items-center gap-2 text-xl font-bold text-slate-900">
          <Gift size={21} className="text-blue-600" />
          Referral Program
        </h1>
        <p className="mt-1 text-xs text-slate-500">
          Invite friends and earn credits when they join a plan.
        </p>
      </header>

      <div className="mb-4 flex flex-wrap gap-2">
        <span className="rounded-[10px] border border-blue-600 bg-blue-600 px-3.5 py-2.5 text-xs font-semibold text-white shadow-sm sm:text-sm">
          Referral Overview
        </span>
      </div>

      {statusMessage && (
        <p className="mb-3 text-xs text-slate-600" role="status">
          {statusMessage}
        </p>
      )}

      <div className="space-y-5">
          <section className="rounded-xl border border-blue-100 bg-slate-50 p-4 sm:p-5">
            <h2 className="text-sm font-bold text-slate-900">
              Your referral link
            </h2>
            <div className="mt-2 flex flex-col gap-2 sm:flex-row">
              <div className="flex min-w-0 flex-1 items-center gap-2 rounded-[10px] border border-blue-100 bg-blue-50 px-3 py-2.5 text-xs text-blue-700">
                <Link2 size={15} className="shrink-0" />
                <span className="min-w-0 flex-1 break-all">{referralPath}</span>
              </div>
              <button
                type="button"
                onClick={() => copyToClipboard(referralPath, "Referral link")}
                className="inline-flex items-center justify-center gap-2 rounded-[10px] bg-blue-600 px-4 py-2.5 text-xs font-semibold text-white hover:bg-blue-700"
              >
                {copiedText === "Referral link" ? (
                  <Check size={15} />
                ) : (
                  <Clipboard size={15} />
                )}
                {copiedText === "Referral link" ? "Copied" : "Copy link"}
              </button>
              <button
                type="button"
                onClick={shareReferralLink}
                className="inline-flex items-center justify-center gap-2 rounded-[10px] border border-slate-200 bg-white px-4 py-2.5 text-xs font-semibold text-slate-700 hover:border-blue-300 hover:text-blue-700"
              >
                <Share2 size={15} />
                Share
              </button>
            </div>

            <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-slate-600">
              <span>
                Referral code:{" "}
                <strong className="text-slate-900">{referralCode}</strong>
              </span>
              <button
                type="button"
                onClick={() => copyToClipboard(referralCode, "Referral code")}
                className="inline-flex items-center gap-1 font-semibold text-blue-600 hover:text-blue-700"
              >
                {copiedText === "Referral code" ? (
                  <Check size={13} />
                ) : (
                  <Clipboard size={13} />
                )}
                {copiedText === "Referral code" ? "Copied" : "Copy code"}
              </button>
            </div>
          </section>

          <section>
            <div className="mb-2 flex items-center justify-between">
              <h2 className="text-sm font-bold text-slate-900">Quick stats</h2>
              <span className="rounded-full border border-slate-200 bg-slate-50 px-2 py-1 text-[10px] font-medium text-slate-500">
                Preview data
              </span>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {referralStats.map((stat) => {
                const StatIcon = stat.icon;
                return (
                  <article
                    key={stat.title}
                    className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-4"
                  >
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                      <StatIcon size={21} />
                    </span>
                    <div>
                      <p className="text-xs text-slate-500">{stat.title}</p>
                      <p className="mt-0.5 text-xl font-bold text-slate-900">
                        {stat.value}
                      </p>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
      </div>
    </main>
  );
}
