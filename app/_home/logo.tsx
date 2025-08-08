import { Poppins } from "next/font/google";
import { EyeOff } from 'lucide-react'


import { cn } from "@/lib/utils";

const font = Poppins({
    subsets: ["latin"],
    weight: ["400", "600"]
});

export const Logo = () => {
    return (
        <div className="flex items-center gap-x-2">
            <EyeOff 
  color="white" 
  className="h-[40px] w-[40px] rounded-full p-2 bg-gradient-to-br from-[#FF75A0] to-[#FFAA70] dark:hidden" 
/>

<EyeOff 
  color="white" 
  className="h-[40px] w-[40px] rounded-full p-2 bg-gradient-to-br from-[#FF75A0] to-[#FFAA70] hidden dark:block" 
/>

            <p className={cn("font-semibold text-xl", font.className)}>
                OFU
            </p>
        </div>
    )
}