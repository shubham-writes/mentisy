import Image from "next/image";
import { Poppins } from "next/font/google";

const font = Poppins({
  subsets: ["latin"],
  weight: ["400", "600"],
});

export const Logo = () => {
  return (
    <div className="flex items-center gap-x-2">
      {/* Light mode logo */}
      <Image
        src="/mentisyLogo85.svg"
        alt="Mentisy Logo"
        width={56}   // similar to w-14
        height={56}  // similar to h-14
        className="object-contain rounded-ful"
        priority
      /></div>
  );
};
