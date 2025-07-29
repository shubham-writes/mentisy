"use client";

interface WatermarkProps {
  name?: string;
  ip?: string;
  animated?: boolean; // Add the 'animated' prop
}

export function Watermark({ name, ip, animated = false }: WatermarkProps) {
  const watermarkText = `For ${name || 'user'} from IP: ${ip || '...'} • `;
  const repeatedText = Array(10).fill(watermarkText).join('');

  // Conditionally set the animation style
  const animationStyle = animated 
    ? { animation: 'scrollWatermark 40s linear infinite' }
    : {};
    
  const reverseAnimationStyle = animated
    ? { animation: 'scrollWatermark 40s linear infinite reverse' }
    : {};

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
      
      {/* Line 1 */}
      <div 
        className="absolute" 
        style={{ top: '20%', width: '200%', transform: 'rotate(-25deg) translateX(-25%)' }}
      >
        <div
          className="whitespace-nowrap opacity-25"
          style={{
            color: 'white',
            fontSize: '2rem',
            fontWeight: 'bold',
            textShadow: '0 0 5px rgba(0,0,0,0.8)',
            ...animationStyle // Apply conditional animation
          }}
        >
          {repeatedText}
        </div>
      </div>
      
      {/* Line 2 */}
      <div 
        className="absolute" 
        style={{ top: '50%', width: '200%', transform: 'rotate(-25deg) translateX(-25%)' }}
      >
        <div
          className="whitespace-nowrap opacity-25"
          style={{
            color: 'white',
            fontSize: '2rem',
            fontWeight: 'bold',
            textShadow: '0 0 5px rgba(0,0,0,0.8)',
            ...reverseAnimationStyle // Apply conditional animation
          }}
        >
          {repeatedText}
        </div>
      </div>
      
      {/* Line 3 */}
      <div 
        className="absolute" 
        style={{ top: '80%', width: '200%', transform: 'rotate(-25deg) translateX(-25%)' }}
      >
        <div
          className="whitespace-nowrap opacity-25"
          style={{
            color: 'white',
            fontSize: '2rem',
            fontWeight: 'bold',
            textShadow: '0 0 5px rgba(0,0,0,0.8)',
            ...animationStyle // Apply conditional animation
          }}
        >
          {repeatedText}
        </div>
      </div>

    </div>
  );
}