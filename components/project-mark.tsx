"use client";

import { useEffect, useRef } from "react";

const GLYPH_W = 5;
const GLYPH_H = 5;
const CELL = 10;
const GAP = CELL;

const RADIUS = 60;
const LIFT = 2;
const STRETCH_X = 0.5;
const STRETCH_Y = 0.4;

const FONT: Record<string, string[]> = {
  A: [".###.", "#...#", "#####", "#...#", "#...#"],
  B: ["####.", "#...#", "####.", "#...#", "####."],
  C: [".###.", "#...#", "#....", "#...#", ".###."],
  D: ["####.", "#...#", "#...#", "#...#", "####."],
  E: ["#####", "#....", "####.", "#....", "#####"],
  F: ["#####", "#....", "####.", "#....", "#...."],
  G: [".###.", "#...#", "#....", "#.###", ".###."],
  H: ["#...#", "#...#", "#####", "#...#", "#...#"],
  I: ["#####", "..#..", "..#..", "..#..", "#####"],
  J: ["..###", "...#.", "...#.", "#..#.", ".##.."],
  K: ["#...#", "#..#.", "###..", "#..#.", "#...#"],
  L: ["#....", "#....", "#....", "#....", "#####"],
  M: ["#...#", "##.##", "#.#.#", "#...#", "#...#"],
  N: ["#...#", "##..#", "#.#.#", "#..##", "#...#"],
  O: [".###.", "#...#", "#...#", "#...#", ".###."],
  P: ["####.", "#...#", "####.", "#....", "#...."],
  Q: [".###.", "#...#", "#...#", "#.#.#", ".####"],
  R: ["####.", "#...#", "####.", "#..#.", "#...#"],
  S: [".####", "#....", ".###.", "....#", "####."],
  T: ["#####", "..#..", "..#..", "..#..", "..#.."],
  U: ["#...#", "#...#", "#...#", "#...#", ".###."],
  V: ["#...#", "#...#", "#...#", ".#.#.", "..#.."],
  W: ["#...#", "#...#", "#.#.#", "##.##", "#...#"],
  X: ["#...#", ".#.#.", "..#..", ".#.#.", "#...#"],
  Y: ["#...#", ".#.#.", "..#..", "..#..", "..#.."],
  Z: ["#####", "...#.", "..#..", ".#...", "#####"],
  "0": [".###.", "#...#", "#...#", "#...#", ".###."],
  "1": ["..#..", ".##..", "..#..", "..#..", "#####"],
  "2": [".###.", "#...#", "..##.", ".#...", "#####"],
  "3": ["####.", "....#", ".###.", "....#", "####."],
  "4": ["#...#", "#...#", "#####", "....#", "....#"],
  "5": ["#####", "#....", "####.", "....#", "####."],
  "6": [".###.", "#....", "####.", "#...#", ".###."],
  "7": ["#####", "...#.", "..#..", ".#...", ".#..."],
  "8": [".###.", "#...#", ".###.", "#...#", ".###."],
  "9": [".###.", "#...#", ".####", "....#", ".###."],
  "?": [".###.", "#...#", "..##.", ".....", "..#.."],
};

export type MarkTone = "foreground" | "muted" | "info" | "live";
export type MarkAnim = "blink" | "bob" | "pulse" | "scan" | "jitter";

const TONE_COLOR: Record<MarkTone, string> = {
  foreground: "var(--foreground)",
  muted: "var(--muted-foreground)",
  info: "var(--info)",
  live: "var(--live)",
};

type Cell = {
  el: SVGRectElement;
  cx: number;
  cy: number;
};

export function ProjectMark({
  mark,
  tone = "foreground",
  anim = "blink",
  className,
}: {
  mark: string;
  tone?: MarkTone;
  anim?: MarkAnim;
  className?: string;
}) {
  const chars = Array.from(mark.toUpperCase()).slice(0, 3);
  const count = Math.max(chars.length, 1);
  const width = count * GLYPH_W * CELL + (count - 1) * GAP;
  const height = GLYPH_H * CELL;
  const svgRef = useRef<SVGSVGElement>(null);
  const scan = anim === "scan";

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const cells: Cell[] = [];
    svg.querySelectorAll<SVGRectElement>("[data-cell]").forEach((el) => {
      cells.push({
        el,
        cx: el.x.baseVal.value + CELL / 2,
        cy: el.y.baseVal.value + CELL / 2,
      });
    });

    const pointer = { x: 0, y: 0, active: false };
    let raf = 0;

    const apply = () => {
      raf = 0;
      for (const c of cells) {
        let warp = 0;
        if (pointer.active) {
          const dist = Math.hypot(c.cx - pointer.x, c.cy - pointer.y);
          if (dist < RADIUS) {
            const t = 1 - dist / RADIUS;
            warp = t * t;
          }
        }

        if (warp < 0.002) {
          if (c.el.style.transform) c.el.style.transform = "";
          continue;
        }

        c.el.style.transform = `translateY(${(-LIFT * warp).toFixed(2)}px) scale(${(1 + STRETCH_X * warp).toFixed(3)}, ${(1 + STRETCH_Y * warp).toFixed(3)})`;
      }
    };

    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(apply);
    };

    const toLocal = (clientX: number, clientY: number) => {
      const ctm = svg.getScreenCTM();
      if (!ctm) return { x: 0, y: 0 };
      const pt = new DOMPoint(clientX, clientY).matrixTransform(ctm.inverse());
      return { x: pt.x, y: pt.y };
    };

    const onMove = (event: PointerEvent) => {
      const p = toLocal(event.clientX, event.clientY);
      pointer.x = p.x;
      pointer.y = p.y;
      pointer.active = true;
      schedule();
    };

    const onLeave = () => {
      pointer.active = false;
      schedule();
    };

    svg.addEventListener("pointermove", onMove, { passive: true });
    svg.addEventListener("pointerleave", onLeave);
    svg.addEventListener("pointercancel", onLeave);

    return () => {
      if (raf) cancelAnimationFrame(raf);
      svg.removeEventListener("pointermove", onMove);
      svg.removeEventListener("pointerleave", onLeave);
      svg.removeEventListener("pointercancel", onLeave);
    };
  }, []);

  return (
    <svg
      ref={svgRef}
      aria-hidden="true"
      role="presentation"
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className={className}
    >
      <g
        className={`mark-anim mark-anim--${anim}`}
        style={{ color: TONE_COLOR[tone] }}
      >
        {chars.flatMap((ch, gi) => {
          const glyph = FONT[ch] ?? FONT["?"];
          const ox = gi * (GLYPH_W * CELL + GAP);
          return glyph.flatMap((row, y) =>
            row.split("").map((cell, x) => {
              if (cell === ".") return null;
              return (
                <rect
                  key={`${gi}-${x}-${y}`}
                  data-cell=""
                  className="mark-cell"
                  x={ox + x * CELL}
                  y={y * CELL}
                  width={CELL}
                  height={CELL}
                  fill="currentColor"
                  style={
                    scan
                      ? { animationDelay: `${(gi * GLYPH_W + x) * 90}ms` }
                      : undefined
                  }
                />
              );
            }),
          );
        })}
      </g>
      <style>{`
        .mark-cell {
          transform-box: fill-box;
          transform-origin: bottom center;
          transition: transform 220ms cubic-bezier(0.22, 1, 0.36, 1);
        }
        @keyframes mark-blink {
          0%, 86%, 100% { opacity: 1; }
          92% { opacity: 0.12; }
        }
        .mark-anim--blink { animation: mark-blink 4.2s ease-in-out infinite; }
        @keyframes mark-bob {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-3px); }
        }
        .mark-anim--bob { animation: mark-bob 2.6s ease-in-out infinite; }
        @keyframes mark-pulse {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 1; }
        }
        .mark-anim--pulse { animation: mark-pulse 2.2s ease-in-out infinite; }
        @keyframes mark-scan {
          0%, 100% { opacity: 0.22; }
          40%, 60% { opacity: 1; }
        }
        .mark-anim--scan .mark-cell {
          animation: mark-scan 2s ease-in-out infinite;
        }
        @keyframes mark-jitter {
          0%, 100% { transform: translate(0, 0); }
          25% { transform: translate(-1px, 1px); }
          50% { transform: translate(1px, -1px); }
          75% { transform: translate(-1px, 0); }
        }
        .mark-anim--jitter { animation: mark-jitter 1.8s steps(1, end) infinite; }
        @media (prefers-reduced-motion: reduce) {
          .mark-cell { transition: none; }
          .mark-anim { animation: none !important; }
          .mark-anim .mark-cell { animation: none !important; }
        }
      `}</style>
    </svg>
  );
}
