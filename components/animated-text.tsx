"use client";

import { motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";

export function AnimatedText({
  phrases,
  interval = 2800,
  className,
}: {
  phrases: string[];
  interval?: number;
  className?: string;
}) {
  const [index, setIndex] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (phrases.length <= 1) return;
    const id = setInterval(
      () => setIndex((v) => (v + 1) % phrases.length),
      interval,
    );
    return () => clearInterval(id);
  }, [phrases.length, interval]);

  const text = phrases[index] ?? "";

  return (
    <span className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true" className="inline-flex flex-wrap">
        {text.split("").map((char, i) => (
          <motion.span
            key={`${index}-${i}`}
            initial={
              reduce
                ? { opacity: 0 }
                : { opacity: 0, filter: "blur(8px)", y: 12 }
            }
            animate={
              reduce
                ? { opacity: 1 }
                : { opacity: 1, filter: "blur(0px)", y: 0 }
            }
            transition={{ delay: i * 0.02, duration: 0.35, ease: "easeOut" }}
            className="inline-block whitespace-pre"
          >
            {char}
          </motion.span>
        ))}
      </span>
    </span>
  );
}
