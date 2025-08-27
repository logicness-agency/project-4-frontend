import Prism from "../components/Prism";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="relative w-full min-h-screen bg-black overflow-hidden flex flex-col">
      {/* Hintergrund */}
      <div className="absolute inset-0 z-0">
        <Prism
          animationType="rotate"
          timeScale={0.7}
          height={3.5}
          baseWidth={5.5}
          scale={3.5}
          hueShift={0}
          colorFrequency={1.8}
          noise={0}
          glow={1}
          bloom={1.1}
        />
      </div>

      {/* Content Overlay */}
      <div className="flex-1 z-10 flex flex-col items-center justify-center text-white text-center space-y-4 pointer-events-none">
        <h1 className="text-3xl md:text-4xl font-bold max-w-md leading-snug">
          Tell us about the movie
        </h1>

        <div className="flex space-x-3 pointer-events-auto">
          <Link to="/movies">
            <button className="bg-white text-black font-semibold px-6 py-2 rounded-full shadow-md hover:opacity-90 transition text-sm md:text-base">
              Start Rating
            </button>
          </Link>

          <Link to="/about">
            <button className="bg-white/10 border border-white/20 text-white px-6 py-2 rounded-full hover:bg-[#FAF1E1]/30 transition text-sm md:text-base">
              Learn More
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
