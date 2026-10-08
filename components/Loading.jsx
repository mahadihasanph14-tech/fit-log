export default function Loading({ text = "Loading workouts…" }) {
  return (
    <div className="py-20 grid place-items-center">
      <div className="flex items-center gap-3 text-zinc-400">
        <span className="w-5 h-5 border-2 border-zinc-700 border-t-accent rounded-full animate-spin" />
        {text}
      </div>
    </div>
  );
}
