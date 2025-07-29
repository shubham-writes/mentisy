"use client";

interface WatermarkProps {
  name?: string;
  ip?: string;
}

export function Watermark({ name, ip }: WatermarkProps) {
  // Construct the watermark text, prioritizing the IP address
  const watermarkText = ip 
    ? `Viewed by ${name || 'user'} from IP: ${ip}` 
    : (name || "");

  if (!watermarkText) return null;

  return (
    <div className="absolute inset-0 flex items-center justify-center p-4 pointer-events-none">
      <p className="text-white text-lg md:text-2xl font-bold opacity-30 select-none break-all text-center">
        {watermarkText}
      </p>
    </div>
  );
}