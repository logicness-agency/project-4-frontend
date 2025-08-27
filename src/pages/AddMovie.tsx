import { useState } from "react";
import { useNavigate } from "react-router-dom";

const API = import.meta.env.VITE_API_URL ?? "http://localhost:3000";

export default function AddMovie() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [year, setYear] = useState<number | "">("");
  const [genre, setGenre] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    await fetch(`${API}/movies`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        year: year === "" ? null : year,
        genre,
        imageUrl,
      }),
    });
    navigate("/movies");
  }

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center px-4">
      <div className="w-full max-w-sm bg-[#1c1c1e]/80 p-6 rounded-xl shadow-xl border border-gray-700">
        <h1 className="text-2xl font-semibold mb-4">Add New Movie</h1>

        <form onSubmit={handleSave} className="space-y-3">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            className="w-full px-3 py-2 text-sm bg-white/10 border border-white/15 rounded-md placeholder-white/50 focus:outline-none focus:ring-1 focus:ring-white/40"
          />
          <input
            value={year}
            type="number"
            onChange={(e) => {
              const v = e.target.value;
              setYear(v === "" ? "" : Number(v));
            }}
            placeholder="Year"
            className="w-full px-3 py-2 text-sm bg-white/10 border border-white/15 rounded-md placeholder-white/50 focus:outline-none focus:ring-1 focus:ring-white/40"
          />
          <input
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            placeholder="Genre"
            className="w-full px-3 py-2 text-sm bg-white/10 border border-white/15 rounded-md placeholder-white/50 focus:outline-none focus:ring-1 focus:ring-white/40"
          />
          <input
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="Image URL"
            className="w-full px-3 py-2 text-sm bg-white/10 border border-white/15 rounded-md placeholder-white/50 focus:outline-none focus:ring-1 focus:ring-white/40"
          />

          <div className="flex items-center justify-end pt-2 space-x-2">
            <button
              type="button"
              onClick={() => navigate("/movies")}
              className="px-3 py-1.5 text-sm rounded-md bg-white/10 hover:bg-white/15"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-3 py-1.5 text-sm rounded-md bg-white/10 hover:bg-[#FAF1E1]/30"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
