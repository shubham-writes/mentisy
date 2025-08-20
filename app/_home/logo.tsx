import Image from "next/image";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";

const font = Poppins({
  subsets: ["latin"],
  weight: ["400", "600"],
});

export const Logo = () => {
  return (
    <div className="flex items-center gap-x-2">
      {/* Light mode logo */}
      <Image
        src="/mentisyLogo-light.png"
        alt="Mentisy Logo"
        width={130}
        height={130}
        className="rounded-full dark:hidden"
        priority
      />

      {/* Dark mode logo */}
      <Image
        src="/mentisyLogo-dark.png"
        alt="Mentisy Logo Dark"
        width={130}
        height={130}
        className="rounded-full hidden dark:block"
        priority
      />

      
    </div>
  );
};
