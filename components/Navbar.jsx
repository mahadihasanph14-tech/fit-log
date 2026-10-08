"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useWorkout } from "@/context/WorkoutContext";
import Image from "next/image";
export default function Navbar() {
  const path = usePathname(),
    { plan, saved } = useWorkout();
  return (
    <header className="sticky top-0 z-50 border-b border-zinc-800/80 bg-black/90 backdrop-blur">
      <div className="max-w-7xl mx-auto px-5 md:px-8 h-20 flex items-center justify-between gap-4">
        <Link
  href="/"
  className="flex items-center gap-3 font-black tracking-tight"
>
  
  <Image 
    src="/images/logo.png" 
    alt="Fitlog Logo Icon" 
    width={36}  
    height={36} 
    className="object-contain" 
  />
  
  <span className="text-xl">FITLOG</span>
</Link>
        <nav className="hidden md:flex items-center gap-2">
          <Link
            href="/"
            className={`px-5 py-2 rounded-full text-sm font-bold ${path === "/" ? "bg-white text-black" : "text-zinc-400 hover:text-white"}`}
          >
            Workout
          </Link>
          <Link
            href="/my-plan"
            className={`px-5 py-2 rounded-full text-sm font-bold ${path === "/my-plan" ? "bg-white text-black" : "text-zinc-400 hover:text-white"}`}
          >
            My Plan
          </Link>
        </nav>
        <div className="flex items-center gap-2">
          <Link
            href="/my-plan"
            className="bg-accent text-black px-3 py-2 rounded-full text-xs font-black"
          >
            PLAN {plan.length}
          </Link>
          <Link
            href="/my-plan?tab=saved"
            className="border border-zinc-600 px-3 py-2 rounded-full text-xs font-black text-zinc-200"
          >
            SAVED {saved.length}
          </Link>
        </div>
      </div>
      <div className="md:hidden border-t border-zinc-900 px-5 py-2 flex gap-2">
        <Link
          href="/"
          className={`text-xs font-bold ${path === "/" ? "text-accent" : "text-zinc-400"}`}
        >
          WORKOUT
        </Link>
        <Link
          href="/my-plan"
          className={`text-xs font-bold ${path === "/my-plan" ? "text-accent" : "text-zinc-400"}`}
        >
          MY PLAN
        </Link>
      </div>
    </header>
  );
}
