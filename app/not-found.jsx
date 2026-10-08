import Link from "next/link";
export default function NotFound() {
  return (
    <div className="min-h-[70vh] grid place-items-center px-6">
      <div className="text-center">
        <p className="text-accent font-bold tracking-[.3em]">404</p>
        <h1 className="display text-7xl md:text-9xl mt-3">ROUTE NOT FOUND</h1>
        <p className="text-zinc-400 mt-5">This page does not exist.</p>
        <Link
          href="/"
          className="btn inline-flex mt-8 bg-accent text-black font-bold px-6 py-3 rounded-full"
        >
          GO HOME
        </Link>
      </div>
    </div>
  );
}
