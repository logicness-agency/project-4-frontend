import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

type Movie = {
  id: number;
  title: string;
  year?: number;
  genre?: string;
  imageUrl?: string;
};

const API = import.meta.env.VITE_API_URL ?? "http://localhost:3000";

export default function EditMovie() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [movie, setMovie] = useState<Movie | null>(null);

  const [title, setTitle] = useState("");
  const [year, setYear] = useState<number | "">("");
  const [genre, setGenre] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${API}/movies/${id}`);
        if (!res.ok) throw new Error("not found");
        const data: Movie = await res.json();
        setMovie(data);
        setTitle(data.title ?? "");
        setYear(data.year ?? "");
        setGenre(data.genre ?? "");
        setImageUrl(data.imageUrl ?? "");
      } catch (e) {
        console.error(e);
      }
    })();
  }, [id]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) return;

    const payload = {
      title: title.trim(),
      year: year === "" ? undefined : Number(year),
      genre: genre.trim() || undefined,
      imageUrl: imageUrl.trim() || undefined,
    };

    const res = await fetch(`${API}/movies/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      alert("Update failed");
      return;
    }
    navigate("/movies");
  }

  async function handleDelete() {
    if (!confirm("Delete this movie?")) return;
    const res = await fetch(`${API}/movies/${id}`, { method: "DELETE" });
    if (!res.ok) {
      alert("Delete failed");
      return;
    }
    navigate("/movies");
  }

  if (!movie) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p className="text-gray-400">Loading…</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-black flex items-center justify-center px-6">
      <div className="w-full max-w-md bg-[#1c1c1e]/80 backdrop-blur-sm border border-gray-700 rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-center mb-6 text-white">Edit Movie</h2>

        <form onSubmit={handleSubmit} className="space-y-4 text-left">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-1">
              Title
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full px-3 py-2 border bg-black/40 border-gray-600 rounded-md shadow-sm text-white focus:outline-none focus:ring-2 focus:ring-[#FAF1E1]/30"
            />
          </div>

          <div>
            <label htmlFor="year" className="block text-sm font-medium text-gray-300 mb-1">
              Year
            </label>
            <input
              id="year"
              type="number"
              value={year}
              onChange={(e) => setYear(e.target.value === "" ? "" : Number(e.target.value))}
              className="w-full px-3 py-2 border bg-black/40 border-gray-600 rounded-md shadow-sm text-white focus:outline-none focus:ring-2 focus:ring-[#FAF1E1]/30"
            />
          </div>

          <div>
            <label htmlFor="genre" className="block text-sm font-medium text-gray-300 mb-1">
              Genre
            </label>
            <input
              id="genre"
              type="text"
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              className="w-full px-3 py-2 border bg-black/40 border-gray-600 rounded-md shadow-sm text-white focus:outline-none focus:ring-2 focus:ring-[#FAF1E1]/30"
            />
          </div>

          <div>
            <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-300 mb-1">
              Image URL
            </label>
            <input
              id="imageUrl"
              type="url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="w-full px-3 py-2 border bg-black/40 border-gray-600 rounded-md shadow-sm text-white focus:outline-none focus:ring-2 focus:ring-[#FAF1E1]/30"
            />
          </div>

          <div className="flex gap-4 mt-6">
            <button
              type="button"
              onClick={() => navigate("/movies")}
              className="flex-1 px-4 py-2 rounded-md border border-gray-600 text-gray-300 hover:bg-[#FAF1E1]/10 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 rounded-md bg-white/10 text-white font-semibold hover:bg-[#FAF1E1]/30 transition"
            >
              Save Changes
            </button>
          </div>
        </form>

        <div className="mt-6">
          <button
            type="button"
            onClick={handleDelete}
            className="w-full px-4 py-2 rounded-md bg-red-600 text-white font-semibold hover:bg-red-700 transition"
          >
            Delete Movie
          </button>
        </div>
      </div>
    </main>
  );
}
