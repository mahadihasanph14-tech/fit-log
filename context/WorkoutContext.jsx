"use client";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
const C = createContext(null);
export function WorkoutProvider({ children }) {
  const [plan, setPlan] = useState([]),
    [saved, setSaved] = useState([]),
    [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    try {
      setPlan(JSON.parse(localStorage.getItem("fitlog-plan") || "[]"));
      setSaved(JSON.parse(localStorage.getItem("fitlog-saved") || "[]"));
    } catch {}
    setHydrated(true);
  }, []);
  useEffect(() => {
    if (hydrated) localStorage.setItem("fitlog-plan", JSON.stringify(plan));
  }, [plan, hydrated]);
  useEffect(() => {
    if (hydrated) localStorage.setItem("fitlog-saved", JSON.stringify(saved));
  }, [saved, hydrated]);
  const addPlan = (w) => {
    if (plan.length >= 5)
      return { ok: false, msg: "Today’s plan is full (5 lifts max)." };
    if (plan.some((x) => x.id === w.id))
      return { ok: false, msg: "Already in today’s plan." };
    setPlan((p) => [...p, { ...w, done: false }]);
    return { ok: true, msg: "Added to today’s plan" };
  };
  const removePlan = (id) => setPlan((p) => p.filter((x) => x.id !== id));
  const toggleDone = (id) =>
    setPlan((p) => p.map((x) => (x.id === id ? { ...x, done: true } : x)));
  const addSaved = (w) => {
    if (saved.some((x) => x.id === w.id))
      return { ok: false, msg: "Already saved for later." };
    setSaved((s) => [...s, w]);
    return { ok: true, msg: "Saved for later" };
  };
  const removeSaved = (id) => setSaved((s) => s.filter((x) => x.id !== id));
  const value = useMemo(
    () => ({
      plan,
      saved,
      addPlan,
      removePlan,
      toggleDone,
      addSaved,
      removeSaved,
    }),
    [plan, saved],
  );
  return <C.Provider value={value}>{children}</C.Provider>;
}
export const useWorkout = () => useContext(C);
