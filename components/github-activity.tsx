import { Panel } from "@/components/ui/panel";
import { getContributions, type ContributionDay } from "@/lib/github";
import { cn } from "@/lib/utils";

const LEVEL_BG = [
  "bg-muted",
  "bg-live/25",
  "bg-live/45",
  "bg-live/70",
  "bg-live",
];

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

function toWeeks(days: ContributionDay[]) {
  const weeks: (ContributionDay | null)[][] = [];
  let current: (ContributionDay | null)[] = [];

  const first = new Date(days[0]?.date ?? Date.now());
  const offset = Number.isNaN(first.getTime()) ? 0 : first.getUTCDay();
  for (let i = 0; i < offset; i++) current.push(null);

  for (const day of days) {
    current.push(day);
    if (current.length === 7) {
      weeks.push(current);
      current = [];
    }
  }
  if (current.length > 0) {
    while (current.length < 7) current.push(null);
    weeks.push(current);
  }
  return weeks;
}

export async function GitHubActivity() {
  const data = await getContributions();

  if (!data || data.days.length === 0) {
    return (
      <Panel id="github" title="GitHub Activity">
        <p className="font-mono text-sm text-muted-foreground">
          Contribution data unavailable.
        </p>
      </Panel>
    );
  }

  const weeks = toWeeks(data.days);

  return (
    <Panel id="github" title="GitHub Activity">
      <p className="mb-4 font-mono text-xs text-muted-foreground">
        <span className="text-foreground">{data.total}</span> contributions in
        the last year
      </p>

      <div className="overflow-x-auto pb-1">
        <div className="inline-flex flex-col gap-1.5">
          <div className="flex gap-[3px] pl-0">
            {weeks.map((week, i) => {
              const first = week.find((d) => d !== null);
              const month = first ? new Date(first.date).getUTCMonth() : null;
              const prev = weeks[i - 1]?.find((d) => d !== null);
              const prevMonth = prev
                ? new Date(prev.date).getUTCMonth()
                : null;
              const showLabel = month !== null && month !== prevMonth;
              return (
                <span
                  key={i}
                  className="w-[11px] shrink-0 font-mono text-[10px] leading-3 text-muted-foreground"
                >
                  {showLabel ? MONTHS[month] : ""}
                </span>
              );
            })}
          </div>

          <div className="grid grid-flow-col grid-rows-7 gap-[3px]">
            {weeks.flatMap((week, wi) =>
              week.map((day, di) =>
                day === null ? (
                  <span key={`${wi}-${di}`} className="size-[11px]" />
                ) : (
                  <span
                    key={`${wi}-${di}`}
                    title={`${day.count} contributions on ${day.date}`}
                    className={cn(
                      "size-[11px] rounded-[2px] outline-1 -outline-offset-1 outline-white/5",
                      LEVEL_BG[day.level],
                    )}
                  />
                ),
              ),
            )}
          </div>
        </div>
      </div>

      <div className="mt-3 flex items-center gap-1.5 font-mono text-[10px] text-muted-foreground">
        <span>Less</span>
        {LEVEL_BG.map((bg) => (
          <span key={bg} className={cn("size-[11px] rounded-[2px]", bg)} />
        ))}
        <span>More</span>
      </div>
    </Panel>
  );
}
