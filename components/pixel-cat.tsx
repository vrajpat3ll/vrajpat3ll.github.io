"use client";

import { useEffect, useRef } from "react";

const ART = [
  "....X......X....",
  "...XXX....XXX...",
  "...XXXXXXXXXX...",
  "..XXXXXXXXXXXX..",
  "..XXoXXXXXXoXX..",
  "..XXXXXXXXXXXX..",
  "..XXXXXnnXXXXX..",
  "..XXXXXXXXXXXX..",
  "...XXXXXXXXXX...",
  "....XXXXXXXX....",
  "...XX......XX...",
  "...X........X...",
];

const CELL = 8;

const RADIUS = 32;
const LIFT = 1.5;
const STRETCH_X = 0.5;
const STRETCH_Y = 0.5;

type Cell = {
  el: SVGRectElement;
  cx: number;
  cy: number;
};

export function PixelCat({ className }: { className?: string }) {
  const width = ART[0].length * CELL;
  const height = ART.length * CELL;
  const svgRef = useRef<SVGSVGElement>(null);

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
      {ART.flatMap((row, y) =>
        row.split("").map((cell, x) => {
          if (cell === ".") return null;
          const isEye = cell === "o";
          const isNose = cell === "n";
          return (
            <rect
              key={`${x}-${y}`}
              data-cell=""
              x={x * CELL}
              y={y * CELL}
              width={CELL}
              height={CELL}
              className={
                isEye
                  ? "cat-eye cat-cell fill-background"
                  : isNose
                    ? "cat-cell fill-background opacity-80"
                    : "cat-cell fill-foreground"
              }
            />
          );
        }),
      )}
      <style>{`
        .cat-cell {
          transform-box: fill-box;
          transform-origin: bottom center;
          transition: transform 220ms cubic-bezier(0.22, 1, 0.36, 1);
        }
        @keyframes cat-blink {
          0%, 92%, 100% { opacity: 1; }
          95% { opacity: 0; }
        }
        .cat-eye { animation: cat-blink 4.5s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .cat-cell { transition: none; }
          .cat-eye { animation: none; }
        }
      `}</style>
    </svg>
  );
}
