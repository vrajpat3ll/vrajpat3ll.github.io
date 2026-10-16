"use client";

import { useEffect, useRef, useState } from "react";

const W = 600;
const H = 170;
const GROUND = 132;
const GRAVITY = 2200;
const JUMP_V = 760;
const DINO_X = 48;
const DINO_W = 24;
const DINO_H = 30;

type Obstacle = { x: number; w: number; h: number };
type Phase = "idle" | "running" | "over";

export function DinoGame() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [phase, setPhase] = useState<Phase>("idle");
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(0);

  const phaseRef = useRef<Phase>("idle");
  const setPhaseBoth = (p: Phase) => {
    phaseRef.current = p;
    setPhase(p);
  };

  const g = useRef({
    y: 0,
    vy: 0,
    onGround: true,
    speed: 300,
    distance: 0,
    spawnIn: 70,
    obstacles: [] as Obstacle[],
    fg: "#e4e4e7",
    muted: "#71717a",
    legPhase: 0,
  });

  useEffect(() => {
    const stored = Number(window.localStorage.getItem("dino-best") ?? 0);
    if (Number.isFinite(stored)) setBest(stored);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const state = g.current;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    ctx.scale(dpr, dpr);

    const styles = getComputedStyle(canvas);
    state.fg = styles.getPropertyValue("--foreground").trim() || "#e4e4e7";
    state.muted = styles.getPropertyValue("--muted-foreground").trim() || "#71717a";

    const reset = () => {
      state.y = 0;
      state.vy = 0;
      state.onGround = true;
      state.speed = 300;
      state.distance = 0;
      state.spawnIn = 70;
      state.obstacles = [];
      setScore(0);
    };

    const jump = () => {
      if (phaseRef.current === "idle") {
        reset();
        setPhaseBoth("running");
        state.vy = JUMP_V;
        state.onGround = false;
        return;
      }
      if (phaseRef.current === "over") {
        reset();
        setPhaseBoth("running");
        state.vy = JUMP_V;
        state.onGround = false;
        return;
      }
      if (state.onGround) {
        state.vy = JUMP_V;
        state.onGround = false;
      }
    };

    const spawn = () => {
      const tall = Math.random() > 0.65;
      state.obstacles.push({
        x: W + 20,
        w: tall ? 16 : 11 + Math.random() * 8,
        h: tall ? 40 : 24 + Math.random() * 12,
      });
    };

    const overlaps = (o: Obstacle) => {
      const dinoLeft = DINO_X;
      const dinoRight = DINO_X + DINO_W;
      const dinoBottom = GROUND;
      const dinoTop = GROUND - DINO_H - state.y;
      const oLeft = o.x;
      const oRight = o.x + o.w;
      const oTop = GROUND - o.h;
      return dinoRight > oLeft && dinoLeft < oRight && dinoBottom > oTop && dinoTop < GROUND;
    };

    const roundRect = (
      x: number,
      y: number,
      w: number,
      h: number,
      r: number,
    ) => {
      ctx.beginPath();
      ctx.roundRect(x, y, w, h, r);
      ctx.fill();
    };

    const draw = () => {
      ctx.clearRect(0, 0, W, H);

      ctx.fillStyle = state.muted;
      for (let x = 0; x < W; x += 14) {
        const drift = Math.floor(state.distance) % 14;
        ctx.fillRect(x - drift, GROUND, 8, 2);
      }

      const dinoBottom = GROUND;
      const dinoTop = dinoBottom - DINO_H - state.y;

      ctx.fillStyle = state.fg;
      roundRect(DINO_X, dinoTop + 6, DINO_W, DINO_H - 6, 4);
      roundRect(DINO_X + DINO_W - 8, dinoTop, 13, 12, 3);

      ctx.fillStyle = "#0a0a0a";

      const running = phaseRef.current === "running" && state.onGround;
      if (running) {
        const up = state.legPhase < Math.PI;
        ctx.fillRect(DINO_X + 3, dinoBottom - 5, 6, 5 + (up ? 0 : 3));
        ctx.fillRect(DINO_X + DINO_W - 13, dinoBottom - 5, 6, 5 + (up ? 3 : 0));
      } else {
        ctx.fillRect(DINO_X + 3, dinoBottom - 5, 6, 5);
        ctx.fillRect(DINO_X + DINO_W - 13, dinoBottom - 5, 6, 5);
      }

      for (const o of state.obstacles) {
        ctx.fillStyle = state.fg;
        roundRect(o.x, GROUND - o.h, o.w, o.h, 3);
        roundRect(o.x - o.w * 0.55, GROUND - o.h * 0.7, o.w * 0.6, o.h * 0.35, 2);
        roundRect(o.x + o.w, GROUND - o.h * 0.55, o.w * 0.5, o.h * 0.3, 2);
      }

      if (phaseRef.current !== "idle") {
        ctx.fillStyle = state.muted;
        ctx.font = "12px ui-monospace, monospace";
        ctx.textAlign = "right";
        ctx.fillText(
          String(Math.floor(state.distance / 25)).padStart(5, "0"),
          W - 10,
          22,
        );
        ctx.textAlign = "left";
      }
    };

    const step = (dt: number) => {
      if (phaseRef.current !== "running") return;

      state.legPhase = (state.legPhase + dt * 18) % (Math.PI * 2);

      state.distance += state.speed * dt;
      state.speed = 300 + Math.min(state.distance / 18, 380);

      state.vy -= GRAVITY * dt;
      state.y += state.vy * dt;
      if (state.y <= 0) {
        state.y = 0;
        state.vy = 0;
        state.onGround = true;
      }

      state.spawnIn -= state.speed * dt;
      if (state.spawnIn <= 0) {
        spawn();
        state.spawnIn = 150 + Math.random() * 130;
      }

      for (const o of state.obstacles) o.x -= state.speed * dt;
      state.obstacles = state.obstacles.filter((o) => o.x + o.w > -20);

      const next = Math.floor(state.distance / 25);
      setScore((prev) => (prev === next ? prev : next));

      if (state.obstacles.some(overlaps)) {
        setPhaseBoth("over");
        setBest((prevBest) => {
          const value = Math.max(prevBest, Math.floor(state.distance / 25));
          window.localStorage.setItem("dino-best", String(value));
          return value;
        });
      }
    };

    let last = performance.now();
    const frame = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      step(dt);
      draw();
      rafRef.current = requestAnimationFrame(frame);
    };
    const rafRef = { current: requestAnimationFrame(frame) };

    const onKey = (event: KeyboardEvent) => {
      if (event.code === "Space" || event.code === "ArrowUp") {
        event.preventDefault();
        jump();
      }
    };
    const onPointer = (event: PointerEvent) => {
      event.preventDefault();
      jump();
    };

    window.addEventListener("keydown", onKey);
    canvas.addEventListener("pointerdown", onPointer);

    return () => {
      window.removeEventListener("keydown", onKey);
      canvas.removeEventListener("pointerdown", onPointer);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div className="relative mt-4 overflow-hidden rounded-xl border border-border bg-card">
      <canvas
        ref={canvasRef}
        style={{ color: "var(--foreground)" }}
        className="block h-auto w-full touch-none select-none"
      />

      {phase !== "running" && (
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-1 bg-background/50">
          <p className="font-pixel text-lg font-semibold">
            {phase === "idle" ? "Press Space to run" : "Game over"}
          </p>
          <p className="font-mono text-xs text-muted-foreground">
            {phase === "idle"
              ? "Space / ↑ / tap to jump"
              : `Score ${score} · Space to retry`}
          </p>
        </div>
      )}

      <div className="flex items-center justify-between border-t border-border px-4 py-2 font-mono text-[11px] text-muted-foreground">
        <span>dino run</span>
        <span>
          best {String(best).padStart(5, "0")} · score{" "}
          {String(score).padStart(5, "0")}
        </span>
      </div>
    </div>
  );
}
