import { Panel } from "@/components/ui/panel";
import { getContributions, type ContributionDay } from "@/lib/github";

const CELL = 10;
const GAP = 2;
const PITCH = CELL + GAP;
const LABEL_H = 12;

const LEVEL_FILL = [
  "var(--muted)",
  "color-mix(in oklab, var(--live) 25%, var(--muted))",
  "color-mix(in oklab, var(--live) 50%, var(--muted))",
  "color-mix(in oklab, var(--live) 75%, var(--muted))",
  "var(--live)",
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

type Week = (ContributionDay | null)[];

function toWeeks(days: ContributionDay[]): Week[] {
  const weeks: Week[] = [];
  let current: Week = [];

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

const isDay = (day: ContributionDay | null): day is ContributionDay =>
  day !== null;

function monthLabels(weeks: Week[]) {
  const labels: { x: number; label: string }[] = [];

  weeks.forEach((week, index) => {
    const first = week.find(isDay);
    if (!first) return;

    const month = new Date(first.date).getUTCMonth();
    const previous = weeks[index - 1]?.find(isDay);
    const previousMonth = previous
      ? new Date(previous.date).getUTCMonth()
      : null;

    if (month === previousMonth) return;

    const x = index * PITCH;
    // Skip labels that would collide with the previous one.
    if (labels.length > 0 && x - labels[labels.length - 1].x < 3 * PITCH) {
      return;
    }
    labels.push({ x, label: MONTHS[month] });
  });

  return labels;
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
  const labels = monthLabels(weeks);

  const gridWidth = weeks.length * PITCH - GAP;
  const gridHeight = 7 * PITCH - GAP;
  const totalHeight = LABEL_H + gridHeight;

  return (
    <Panel id="github" title="GitHub Activity">
      <p className="mb-4 font-mono text-xs text-muted-foreground">
        <span className="text-foreground">{data.total}</span> contributions in
        the last year
      </p>

      <div className="overflow-x-auto pb-1">
        <svg
          viewBox={`0 0 ${gridWidth} ${totalHeight}`}
          className="h-auto w-full min-w-[560px]"
          role="img"
          aria-label={`Contribution heatmap: ${data.total} contributions in the last year`}
        >
          {labels.map(({ x, label }) => (
            <text
              key={`${x}-${label}`}
              x={x}
              y={LABEL_H - 4}
              style={{
                fill: "var(--muted-foreground)",
                fontSize: 9,
                fontFamily: "var(--font-mono), monospace",
              }}
            >
              {label}
            </text>
          ))}

          {weeks.map((week, wi) =>
            week.map((day, di) =>
              day === null ? null : (
                <rect
                  key={`${wi}-${di}`}
                  x={wi * PITCH}
                  y={LABEL_H + di * PITCH}
                  width={CELL}
                  height={CELL}
                  rx={2}
                  style={{ fill: LEVEL_FILL[day.level] }}
                >
                  <title>
                    {`${day.count} contribution${day.count === 1 ? "" : "s"} on ${day.date}`}
                  </title>
                </rect>
              ),
            ),
          )}
        </svg>
      </div>
      <div className="mt-3 flex items-center justify-end gap-1.5 font-mono text-[10px] text-muted-foreground">
        <span>Less</span>
        {LEVEL_FILL.map((fill) => (
          <span
            key={fill}
            className="size-[11px] rounded-[2px]"
            style={{ backgroundColor: fill }}
          />
        ))}
        <span>More</span>
      </div>
    </Panel>
  );
}
