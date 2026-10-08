import Image from "next/image";
export default function Footer() {
  return (
    <footer className="border-t border-zinc-800 bg-black">
      <div className="max-w-7xl mx-auto px-5 md:px-8 py-10 flex flex-col md:flex-row justify-between gap-5">
        <div className="flex items-center gap-3 font-black">
         <Image 
             src="/images/logo.png" 
             alt="Fitlog Logo Icon" 
             width={36}  
             height={36} 
             className="object-contain" 
           />
           
          FITLOG
        </div>
        <p className="text-sm text-zinc-500">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
}
