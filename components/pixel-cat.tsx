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

const CELL = 4;

export function PixelCat({ className }: { className?: string }) {
  const width = ART[0].length * CELL;
  const height = ART.length * CELL;

  return (
    <svg
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
              x={x * CELL}
              y={y * CELL}
              width={CELL}
              height={CELL}
              className={
                isEye
                  ? "cat-eye fill-background"
                  : isNose
                    ? "fill-background opacity-80"
                    : "fill-foreground"
              }
            />
          );
        }),
      )}
      <style>{`
        @keyframes cat-blink {
          0%, 92%, 100% { opacity: 1; }
          95% { opacity: 0; }
        }
        .cat-eye { animation: cat-blink 4.5s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .cat-eye { animation: none; }
        }
      `}</style>
    </svg>
  );
}
