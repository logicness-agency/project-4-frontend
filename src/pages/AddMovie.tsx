import { useNavigate } from "react-router-dom";
import AddMovieForm from "../components/AddMovieForm";

export default function AddMovie() {
  const navigate = useNavigate();

  return (
    <main className="flex items-center justify-center min-h-screen bg-black relative">
      <div className="w-full max-w-md rounded-2xl p-8 shadow-2xl bg-white/5 backdrop-blur-lg border border-white/10">
        <h1 className="text-3xl font-bold mb-6 text-center text-white">
          Add New Movie
        </h1>

        <AddMovieForm />

        <div className="mt-6 text-center">
          <button
            onClick={() => navigate("/movies")}
            className="px-6 py-2 bg-white/10 text-white rounded-full font-semibold hover:bg-[#FAF1E1]/30 transition"
          >
            Back to Movies
          </button>
        </div>
      </div>
    </main>
  );
}
