import { useNavigate } from "react-router-dom";
import AddMovieForm from "../components/AddMovieForm";

export default function AddMovie() {
  const navigate = useNavigate();

  return (
    <main className="flex items-center justify-center min-h-screen bg-black px-4">
      <div className="w-full max-w-sm rounded-xl p-6 shadow-xl bg-[#1c1c1e]/80 backdrop-blur-sm border border-gray-700">
        <h1 className="text-2xl font-semibold mb-4 text-center text-white">
          Add New Movie
        </h1>

        <AddMovieForm />

        <div className="mt-4 text-center">
          <button
            onClick={() => navigate("/movies")}
            className="px-4 py-1.5 bg-white/10 text-white rounded-full font-medium hover:bg-[#FAF1E1]/30 transition"
          >
            Back to Movies
          </button>
        </div>
      </div>
    </main>
  );
}
