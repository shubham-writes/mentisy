"use client";

interface WatermarkProps {
  name?: string;
  ip?: string;
  animated?: boolean;
  mode?: "image" | "video"; // 👈 new prop
}

export function Watermark({
  name,
  ip,
  animated = false,
  mode = "video",
}: WatermarkProps) {
  const watermarkText = `${name || "user"} ; IP: ${ip || "..."} • `;
  const repeatedText = Array(20).fill(watermarkText).join("");

  const animationStyle = animated
    ? { animation: "scrollWatermark 40s linear infinite" }
    : {};
  const reverseAnimationStyle = animated
    ? { animation: "scrollWatermark 40s linear infinite reverse" }
    : {};

  // Number of lines & vertical gap based on mode
  const numLines = mode === "image" ? 8 : 8;
  const lineGap = mode === "image" ? 32 : 35;

  const lines = Array.from({ length: numLines }, (_, i) => {
    const top = `${i * lineGap}%`;
    const isEven = i % 2 === 0;

    // ✅ For images: wider lines + staggered positioning
    const width = mode === "image" ? "70%" : "50%";
    const translateX =
      mode === "image"
        ? isEven
          ? "translateX(-30%)"
          : "translateX(-70%)"
        : "translateX(-25%)";

    return (
      <div
        key={i}
        className="absolute"
        style={{
          top,
          width,
          transform: `rotate(-25deg) ${translateX}`,
        }}
      >
        <div
          className="whitespace-nowrap opacity-35"
          style={{
            color: "white",
            fontSize: "1rem",
            fontWeight: "bold",
            textShadow: "0 0 1px #000000, 0 0 1px #000",
            ...(isEven ? animationStyle : reverseAnimationStyle),
          }}
        >
          {repeatedText}
        </div>
      </div>
    );
  });

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
      {lines}
    </div>
  );
}
