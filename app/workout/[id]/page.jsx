"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faBookmark,
  faClock,
  faFire,
  faStar,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import toast from "react-hot-toast";
import { useWorkout } from "@/context/WorkoutContext";
import Loading from "@/components/Loading";
export default function Detail() {
  const { id } = useParams(),
    [w, setW] = useState(null),
    { addPlan, addSaved } = useWorkout();
  useEffect(() => {
    fetch("/api/workouts")
      .then((r) => r.json())
      .then((x) => setW(x.find((a) => a.id === id)));
  }, [id]);
  if (!w) return <Loading />;
  const plan = () => {
    const r = addPlan(w);
    toast(r.msg, { icon: r.ok ? "✓" : "!" });
  };
  const save = () => {
    const r = addSaved(w);
    toast(r.msg, { icon: r.ok ? "✓" : "!" });
  };
  return (
    <div className="max-w-7xl mx-auto px-5 md:px-8 py-10 md:py-16">
      <Link href="/" className="text-zinc-500 hover:text-white text-sm">
        <FontAwesomeIcon icon={faArrowLeft} /> Back to library
      </Link>
      <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 mt-8">
        <div className="rounded-3xl overflow-hidden border border-zinc-800 lg:sticky lg:top-24 flex items-center justify-center bg-zinc-950 p-6 min-h-[500px]">
  <img
    src={w.image}
    alt={w.name}
    className="w-full h-auto max-h-[600px] object-contain"
  />
</div>
        <div>
          <div className="flex flex-wrap gap-2">
            {w.category.map((c) => (
              <span
                key={c}
                className="text-xs font-black tracking-wider border border-zinc-700 rounded-full px-3 py-1.5 text-accent"
              >
                {c.toUpperCase()}
              </span>
            ))}
          </div>
          <h1 className="display text-5xl md:text-7xl leading-none mt-5">
            {w.name}
          </h1>
          <p className="text-zinc-400 leading-7 mt-5">{w.description}</p>
          <div className="grid grid-cols-2 gap-px bg-zinc-800 rounded-2xl overflow-hidden mt-8 border border-zinc-800">
            {[
              ["EQUIPMENT", w.equipment],
              ["DIFFICULTY", w.difficulty],
              ["SETS", w.sets],
              ["REPS", w.reps],
              ["DURATION", `${w.duration} min`],
              ["CALORIES", `${w.calories} kcal`],
              ["RATING", w.rating],
            ].map(([a, b]) => (
              <div key={a} className="bg-panel p-4">
                <p className="text-[10px] tracking-widest text-zinc-500">{a}</p>
                <p className="font-bold mt-1">{b}</p>
              </div>
            ))}
          </div>
          <h2 className="display text-3xl mt-10">INSTRUCTIONS</h2>
          <ol className="mt-4 space-y-3">
            {w.instructions.map((x, i) => (
              <li key={x} className="flex gap-4 text-zinc-300">
                <span className="w-7 h-7 shrink-0 rounded-full bg-zinc-800 text-accent grid place-items-center font-bold text-xs">
                  0{i + 1}
                </span>
                <span>{x}</span>
              </li>
            ))}
          </ol>
          <div className="flex flex-col sm:flex-row gap-3 mt-10">
            <button
              onClick={plan}
              className="btn flex-1 bg-accent text-black font-black rounded-full px-5 py-4"
            >
              <FontAwesomeIcon icon={faPlus} /> ADD TO TODAY'S PLAN
            </button>
            <button
              onClick={save}
              className="btn flex-1 border border-zinc-600 font-black rounded-full px-5 py-4"
            >
              <FontAwesomeIcon icon={faBookmark} /> SAVE FOR LATER
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
