"use client";

import { useId, useMemo, useState } from "react";

/**
 * Interactive deposit-match bonus calculator.
 *
 * bonus = min(deposit * matchPercent/100, maxBonus)
 * playthrough = includeDepositInWagering
 *   ? (deposit + bonus) * wagering
 *   : bonus * wagering
 */
export function BonusCalculator({
  minDeposit = 10,
  matchPercent = 100,
  maxBonus = 200,
  wagering = 35,
  includeDepositInWagering = false,
  maxDeposit,
  step = 5,
  currency = "EUR",
  localeTag = "en-IE",
  copy,
  title,
  subtitle,
}) {
  const uid = useId();
  const depositId = `${uid}-deposit`;

  const sliderMax = useMemo(() => {
    if (typeof maxDeposit === "number" && maxDeposit > minDeposit) {
      return maxDeposit;
    }
    const matchCap =
      matchPercent > 0 ? Math.ceil(maxBonus / (matchPercent / 100)) : maxBonus;
    return Math.max(matchCap * 2, minDeposit * 10, 100);
  }, [maxDeposit, maxBonus, matchPercent, minDeposit]);

  const [deposit, setDeposit] = useState(() =>
    clamp(
      Math.max(minDeposit, Math.min(100, sliderMax)),
      minDeposit,
      sliderMax,
    ),
  );

  const bonus = Math.min((deposit * matchPercent) / 100, maxBonus);
  const total = deposit + bonus;
  const playthroughBase = includeDepositInWagering ? deposit + bonus : bonus;
  const playthrough = playthroughBase * wagering;

  const money = (n) =>
    new Intl.NumberFormat(localeTag, {
      style: "currency",
      currency,
      maximumFractionDigits: n % 1 === 0 ? 0 : 2,
    }).format(n);

  const labels = {
    title: title || copy?.title || "Bonus calculator",
    subtitle: subtitle || copy?.subtitle || "",
    depositLabel: copy?.depositLabel || "Your deposit",
    matchLabel: copy?.matchLabel || "Match",
    maxBonusLabel: copy?.maxBonusLabel || "Max bonus",
    wageringLabel: copy?.wageringLabel || "Wagering",
    yourDeposit: copy?.yourDeposit || "Deposit",
    bonusAmount: copy?.bonusAmount || "Bonus",
    totalBalance: copy?.totalBalance || "Playable total",
    playthrough: copy?.playthrough || "Wagering requirement",
    playthroughHint: includeDepositInWagering
      ? copy?.playthroughWithDepositHint ||
        "Deposit + bonus × wagering multiple."
      : copy?.playthroughHint || "Bonus × wagering multiple.",
    footnote: copy?.footnote || "",
  };

  const progressPct =
    ((deposit - minDeposit) / Math.max(sliderMax - minDeposit, 1)) * 100;

  return (
    <div className="bonus-calculator mx-auto w-full max-w-3xl rounded-2xl border border-blue-100 bg-white p-5 shadow-lg sm:p-8">
      <header className="mb-6 text-center">
        <h2 className="text-2xl font-extrabold tracking-tight text-blue-950 sm:text-3xl">
          {labels.title}
        </h2>
        {labels.subtitle ? (
          <p className="mx-auto mt-2 max-w-xl text-sm leading-relaxed text-slate-600">
            {labels.subtitle}
          </p>
        ) : null}
      </header>

      <div className="mb-6 flex flex-wrap items-center justify-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
        <span className="rounded-full bg-slate-100 px-3 py-1 text-slate-700">
          {labels.matchLabel} {matchPercent}%
        </span>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-slate-700">
          {labels.maxBonusLabel} {money(maxBonus)}
        </span>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-slate-700">
          {labels.wageringLabel} {wagering}×
        </span>
      </div>

      <div className="mb-2 flex items-end justify-between gap-3">
        <label
          htmlFor={depositId}
          className="text-sm font-semibold text-slate-800"
        >
          {labels.depositLabel}
        </label>
        <output
          htmlFor={depositId}
          className="text-2xl font-bold tabular-nums text-blue-800"
        >
          {money(deposit)}
        </output>
      </div>

      <input
        id={depositId}
        type="range"
        min={minDeposit}
        max={sliderMax}
        step={step}
        value={deposit}
        onChange={(e) => setDeposit(Number(e.target.value))}
        className="bonus-calculator-range w-full cursor-pointer appearance-none rounded-full bg-slate-200"
        style={{
          background: `linear-gradient(to right, #1d4ed8 0%, #1d4ed8 ${progressPct}%, #e2e8f0 ${progressPct}%, #e2e8f0 100%)`,
        }}
        aria-valuemin={minDeposit}
        aria-valuemax={sliderMax}
        aria-valuenow={deposit}
        aria-valuetext={money(deposit)}
      />
      <div className="mt-1 flex justify-between text-[11px] font-medium text-slate-400">
        <span>{money(minDeposit)}</span>
        <span>{money(sliderMax)}</span>
      </div>

      <div className="mt-8 grid gap-3 sm:grid-cols-2">
        <ResultCard label={labels.yourDeposit} value={money(deposit)} />
        <ResultCard
          label={labels.bonusAmount}
          value={money(bonus)}
          accent="emerald"
        />
        <ResultCard
          label={labels.totalBalance}
          value={money(total)}
          accent="blue"
        />
        <ResultCard
          label={labels.playthrough}
          value={money(playthrough)}
          accent="amber"
          hint={labels.playthroughHint}
        />
      </div>

      {labels.footnote ? (
        <p className="mt-6 text-center text-xs leading-relaxed text-slate-500">
          {labels.footnote}
        </p>
      ) : null}

      <style>{`
        .bonus-calculator-range {
          height: 0.5rem;
        }
        .bonus-calculator-range::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 1.25rem;
          height: 1.25rem;
          border-radius: 9999px;
          background: #1e3a8a;
          border: 3px solid #fff;
          box-shadow: 0 1px 4px rgba(15, 23, 42, 0.25);
          cursor: pointer;
        }
        .bonus-calculator-range::-moz-range-thumb {
          width: 1.25rem;
          height: 1.25rem;
          border-radius: 9999px;
          background: #1e3a8a;
          border: 3px solid #fff;
          box-shadow: 0 1px 4px rgba(15, 23, 42, 0.25);
          cursor: pointer;
        }
      `}</style>
    </div>
  );
}

function ResultCard({ label, value, accent = "slate", hint }) {
  const tones = {
    slate: "border-slate-200 bg-slate-50 text-slate-900",
    emerald: "border-emerald-200 bg-emerald-50 text-emerald-950",
    blue: "border-blue-200 bg-blue-50 text-blue-950",
    amber: "border-amber-200 bg-amber-50 text-amber-950",
  };
  return (
    <div
      className={`rounded-xl border px-4 py-3 ${tones[accent] || tones.slate}`}
    >
      <div className="text-xs font-semibold uppercase tracking-wide opacity-70">
        {label}
      </div>
      <div className="mt-1 text-xl font-bold tabular-nums sm:text-2xl">
        {value}
      </div>
      {hint ? (
        <p className="mt-1 text-[11px] leading-snug opacity-70">{hint}</p>
      ) : null}
    </div>
  );
}

function clamp(n, min, max) {
  return Math.min(max, Math.max(min, n));
}

export default BonusCalculator;
