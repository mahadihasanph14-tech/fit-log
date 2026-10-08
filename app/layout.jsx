import "./globals.css";
import { WorkoutProvider } from "@/context/WorkoutContext";
import { Toaster } from "react-hot-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
export const metadata = {
  title: "FitLog — Workout Library",
  description: "Train with intent. Log every set.",
};
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <WorkoutProvider>
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                background: "#171717",
                color: "#fff",
                border: "1px solid #333",
              },
            }}
          />
        </WorkoutProvider>
      </body>
    </html>
  );
}
