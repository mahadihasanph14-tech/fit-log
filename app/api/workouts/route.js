import { workouts } from "@/lib/workouts";
export async function GET() {
  await new Promise((r) => setTimeout(r, 650));
  return Response.json(workouts);
}
