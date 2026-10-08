"use client";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import WorkoutCard from "@/components/WorkoutCard";
import Loading from "@/components/Loading";
export default function Home() {
  const [data, setData] = useState([]),
    [loading, setLoading] = useState(true),
    [sort, setSort] = useState("duration");
  useEffect(() => {
    fetch("/api/workouts")
      .then((r) => r.json())
      .then(setData)
      .finally(() => setLoading(false));
  }, []);
  const list = useMemo(
    () => [...data].sort((a, b) => b[sort] - a[sort]),
    [data, sort],
  );
  return (
    <div>
      <section className="relative overflow-hidden border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-5 md:px-8 py-16 md:py-24 grid lg:grid-cols-[1.05fr_.95fr] gap-10 items-center">
          <div>
            <p className="text-accent font-black tracking-[.28em] text-xs">
              WORKOUT LIBRARY
            </p>
            <h1 className="display text-6xl sm:text-7xl lg:text-8xl leading-[.9] mt-5 max-w-4xl">
              TRAIN WITH INTENT.{" "}
              <span className="text-zinc-500">LOG EVERY SET.</span>
            </h1>
            <p className="text-zinc-400 text-base md:text-lg leading-7 max-w-2xl mt-7">
              FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
              into today's plan, and watch the week's work add up.
            </p>
            <a
              href="#library"
              className="btn inline-flex mt-8 items-center gap-3 bg-accent text-black font-black rounded-full px-6 py-4"
            >
              BROWSE WORKOUTS <span>↓</span>
            </a>
          </div>
          <div className="relative min-h-[360px] rounded-3xl overflow-hidden border border-zinc-700">
            <img
  src="/images/banner.png" 
  alt="Gym workout"
  className="absolute inset-0 w-full h-full object-contain"
/>
            <div className="absolute inset-0 bg-zinc-900/30" />
            <div className="absolute bottom-6 left-6">
              <p className="text-xs tracking-widest text-accent font-bold">
                FITLOG / 2026
              </p>
              <p className="display text-4xl mt-2">BUILT FOR CONSISTENCY.</p>
            </div>
          </div>
        </div>
      </section>
      <section
        id="library"
        className="max-w-7xl mx-auto px-5 md:px-8 py-16 md:py-24"
      >
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <p className="text-accent text-xs font-black tracking-[.28em]">
              WORKOUTS
            </p>
            <h2 className="display text-5xl md:text-6xl mt-2">THE LIBRARY</h2>
            <p className="text-zinc-500 mt-2">
              Twelve lifts covering every major muscle group.
            </p>
          </div>
          <label className="flex items-center gap-3 text-sm text-zinc-400">
            Sort By{" "}
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="bg-zinc-900 border border-zinc-700 text-white rounded-full px-4 py-3 outline-none"
            >
              <option value="duration">Duration</option>
              <option value="calories">Calories</option>
              <option value="rating">Rating</option>
            </select>
          </label>
        </div>
        {loading ? (
          <Loading />
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-10">
            {list.map((w) => (
              <WorkoutCard key={w.id} workout={w} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
