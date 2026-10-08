"use client";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClock,
  faFire,
  faStar,
  faArrowUpRightFromSquare,
} from "@fortawesome/free-solid-svg-icons";
export default function WorkoutCard({ workout }) {
  return (
    <Link
      href={`/workout/${workout.id}`}
      className="group block rounded-2xl overflow-hidden border border-zinc-800 bg-panel hover:border-zinc-500 transition"
    >
      <div className="h-52 overflow-hidden relative">
        <img
          src={workout.image}
          alt={workout.name}
          className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
        <div className="absolute bottom-3 left-3 flex gap-2">
          {workout.category.map((c) => (
            <span
              key={c}
              className="text-[10px] font-black tracking-wider bg-black/70 border border-white/15 rounded-full px-2.5 py-1"
            >
              {c.toUpperCase()}
            </span>
          ))}
        </div>
      </div>
      <div className="p-5">
        <h3 className="display text-2xl leading-none">{workout.name}</h3>
        <p className="text-sm text-zinc-500 mt-3">{workout.equipment}</p>
        <div className="mt-5 pt-4 border-t border-zinc-800 flex justify-between text-xs text-zinc-400">
          <span>
            <FontAwesomeIcon icon={faClock} /> {workout.duration} min
          </span>
          <span>
            <FontAwesomeIcon icon={faFire} /> {workout.calories} kcal
          </span>
          <span>
            <FontAwesomeIcon icon={faStar} /> {workout.rating}
          </span>
        </div>
        <div className="mt-4 text-xs font-bold text-accent opacity-0 group-hover:opacity-100 transition">
          VIEW DETAILS <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
        </div>
      </div>
    </Link>
  );
}
