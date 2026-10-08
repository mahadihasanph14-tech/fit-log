"use client";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClock,
  faFire,
  faStar,
  faCheck,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import toast from "react-hot-toast";
import { useWorkout } from "@/context/WorkoutContext";
import dynamic from "next/dynamic";

function Card({ w, plan, onRemove, onDone }) {
  return (
    <div
      className={`border rounded-2xl p-4 bg-panel ${w.done ? "border-accent/40 opacity-70" : "border-zinc-800"}`}
    >
      <div className="flex gap-4">
        <img
          src={w.image}
          alt=""
          className="w-24 h-24 rounded-xl object-cover"
        />
        <div className="flex-1 min-w-0">
          <div className="flex justify-between gap-2">
            <div>
              <h3 className="display text-2xl truncate">{w.name}</h3>
              <p className="text-sm text-zinc-500 mt-1">{w.equipment}</p>
            </div>
            {w.done && (
              <span className="text-accent text-xs font-black">DONE</span>
            )}
          </div>
          <div className="flex gap-4 text-xs text-zinc-400 mt-4">
            <span>
              <FontAwesomeIcon icon={faClock} /> {w.duration}m
            </span>
            <span>
              <FontAwesomeIcon icon={faFire} /> {w.calories} kcal
            </span>
            <span>
              <FontAwesomeIcon icon={faStar} /> {w.rating}
            </span>
          </div>
        </div>
      </div>
      {plan && (
        <div className="flex gap-2 mt-4">
          <Link
            href={`/workout/${w.id}`}
            className="flex-1 text-center rounded-full border border-zinc-700 py-2 text-xs font-bold"
          >
            VIEW DETAILS
          </Link>
          {!w.done && (
            <button
              onClick={onDone}
              className="rounded-full bg-white text-black px-4 py-2 text-xs font-black"
            >
              <FontAwesomeIcon icon={faCheck} /> DONE
            </button>
          )}
          <button
            onClick={onRemove}
            className="rounded-full border border-zinc-700 w-10"
          >
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>
      )}
    </div>
  );
}

function MyPlan() {
  const { plan, saved, removePlan, toggleDone, removeSaved } = useWorkout();
  const params = useSearchParams();
  const [tab, setTab] = useState(
    params.get("tab") === "saved" ? "saved" : "plan",
  );
  const list = tab === "plan" ? plan : saved;
  const minutes = plan.reduce((a, x) => a + x.duration, 0),
    calories = plan.reduce((a, x) => a + x.calories, 0);
  const remove = (id, save = false) => {
    save ? removeSaved(id) : removePlan(id);
    toast(save ? "Removed from saved" : "Removed from today’s plan");
  };
  return (
    <div className="max-w-5xl mx-auto px-5 md:px-8 py-12 md:py-20">
      <p className="text-accent text-xs font-black tracking-[.28em]">
        YOUR LOG
      </p>
      <h1 className="display text-6xl md:text-8xl mt-2">MY PLAN</h1>
      <p className="text-zinc-500 mt-3">
        Cap of five lifts for today. Finish them, then load more.
      </p>
      <div className="grid grid-cols-3 gap-3 mt-10">
        {[
          ["Exercises", plan.length],
          ["Minutes", minutes],
          ["Calories", calories],
        ].map(([x, n]) => (
          <div
            key={x}
            className="bg-panel border border-zinc-800 rounded-2xl p-5"
          >
            <p className="text-xs text-zinc-500">{x}</p>
            <p className="display text-4xl mt-2">{n}</p>
          </div>
        ))}
      </div>
      <div className="flex border-b border-zinc-800 mt-12">
        <button
          onClick={() => setTab("plan")}
          className={`px-5 py-4 text-sm font-bold border-b-2 ${tab === "plan" ? "border-accent text-white" : "border-transparent text-zinc-500"}`}
        >
          TODAY'S PLAN ({plan.length})
        </button>
        <button
          onClick={() => setTab("saved")}
          className={`px-5 py-4 text-sm font-bold border-b-2 ${tab === "saved" ? "border-accent text-white" : "border-transparent text-zinc-500"}`}
        >
          SAVED ({saved.length})
        </button>
      </div>
      <div className="space-y-4 mt-6">
        {list.length ? (
          list.map((w) => (
            <Card
              key={w.id}
              w={w}
              plan={tab === "plan"}
              onDone={() => {
                toggleDone(w.id);
                toast("Workout marked as done", { icon: "✓" });
              }}
              onRemove={() => remove(w.id, tab === "saved")}
            />
          ))
        ) : (
          <div className="border border-dashed border-zinc-700 rounded-3xl py-20 text-center">
            <p className="text-accent text-xs font-black tracking-[.25em]">
              EMPTY
            </p>
            <h2 className="display text-4xl mt-3">NOTHING HERE YET</h2>
            <p className="text-zinc-500 mt-3">
              Browse the library and add a lift to get today moving.
            </p>
            <Link
              href="/"
              className="btn inline-block bg-accent text-black font-black rounded-full px-6 py-3 mt-6"
            >
              GO TO WORKOUTS
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default dynamic(() => Promise.resolve(MyPlan), {
  ssr: false,
  loading: () => (
    <div className="max-w-5xl mx-auto px-5 py-20 text-center text-zinc-500">
      Loading your workout plan...
    </div>
  ),
});
