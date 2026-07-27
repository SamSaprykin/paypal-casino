import { PAYMENT_SPEED_CHART_COPY } from "../../../lib/i18n/copies/payment-speed-chart";
import { cn } from "../../../lib/utils";

const DEPOSIT_BAR = "bg-teal-600";
const WITHDRAW_BAR = "bg-amber-500";
const LABEL_INSIDE_MIN = 28;

function BarRow({ width, label, barClass }) {
  const inside = width >= LABEL_INSIDE_MIN;
  return (
    <div className="flex min-h-7 items-center gap-2.5">
      <div
        className={cn(
          "flex h-7 items-center rounded-md px-3 text-xs font-bold whitespace-nowrap shadow-[inset_0_-1px_0_rgba(0,0,0,0.08)]",
          barClass,
          inside ? "text-white" : "",
        )}
        style={{ width: `${Math.max(width, 4)}%` }}
      >
        {inside ? label : null}
      </div>
      {!inside ? (
        <span className="text-xs font-bold whitespace-nowrap text-slate-700">
          {label}
        </span>
      ) : null}
    </div>
  );
}

function MethodGroup({ method }) {
  return (
    <div className="grid grid-cols-[minmax(7rem,9.5rem)_1fr] items-center gap-x-4 gap-y-2 border-b border-slate-200 py-3 last:border-b-0 sm:grid-cols-[minmax(8.5rem,11rem)_1fr]">
      <div className="text-right text-sm font-semibold leading-snug text-slate-800">
        {method.name}
        {method.nameDetail ? (
          <span className="mt-0.5 block text-xs font-medium text-slate-500">
            {method.nameDetail}
          </span>
        ) : null}
      </div>
      <div className="flex flex-col gap-2">
        <BarRow
          width={method.depositWidth}
          label={method.depositLabel}
          barClass={DEPOSIT_BAR}
        />
        <BarRow
          width={method.withdrawWidth}
          label={method.withdrawLabel}
          barClass={WITHDRAW_BAR}
        />
      </div>
    </div>
  );
}

export function PaymentSpeedChart({ localeId = "en-IE", className }) {
  const copy =
    PAYMENT_SPEED_CHART_COPY[localeId] ?? PAYMENT_SPEED_CHART_COPY["en-IE"];

  return (
    <figure
      className={cn(
        "payment-speed-chart my-8 w-full max-w-full overflow-hidden rounded-xl border border-slate-200 bg-gradient-to-b from-white to-slate-50 p-4 shadow-sm sm:p-6",
        className,
      )}
      role="img"
      aria-label={`${copy.title}. ${copy.subtitle}`}
    >
      <figcaption className="mb-4">
        <h3 className="text-lg font-bold tracking-tight text-slate-900 sm:text-xl">
          {copy.title}
        </h3>
        <p className="mt-1 text-sm text-slate-500">{copy.subtitle}</p>
        <div className="mt-3 flex flex-wrap gap-5 text-sm font-semibold text-slate-700">
          <span className="inline-flex items-center gap-2">
            <i
              className={cn("inline-block h-4 w-4 rounded-sm", DEPOSIT_BAR)}
              aria-hidden
            />
            {copy.deposit}
          </span>
          <span className="inline-flex items-center gap-2">
            <i
              className={cn("inline-block h-4 w-4 rounded-sm", WITHDRAW_BAR)}
              aria-hidden
            />
            {copy.withdraw}
          </span>
        </div>
      </figcaption>

      <div className="w-full">
        {copy.methods.map((method) => (
          <MethodGroup key={method.id} method={method} />
        ))}
      </div>

      <p className="mt-4 text-xs text-slate-400">{copy.footnote}</p>
    </figure>
  );
}
