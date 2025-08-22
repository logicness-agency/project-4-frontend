import Prism from "../components/Prism";

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
      <div className="flex-1 z-10 flex flex-col items-center justify-center text-white text-center space-y-6 pointer-events-none">
        <h1 className="text-5xl font-bold max-w-xl">
         Tell us about the movie
        </h1>

        <div className="flex space-x-4 pointer-events-auto">

            <button className="bg-white text-black font-semibold px-10 py-3 rounded-full shadow-md hover:opacity-90 transition">
              Start Rating
            </button>
        

          
            <button className="bg-white/10 border border-white/20 text-white px-10 py-3 rounded-full hover:bg-[#FAF1E1]/30 transition">
              Learn More
            </button>
        
        </div>
      </div>

    </div>
  );
}
