import { useState } from "react";

const API = import.meta.env.VITE_API_URL ?? "http://localhost:3000";

export default function AddMovieForm() {
  const [title, setTitle] = useState("");
  const [year, setYear] = useState<number | "">("");
  const [genre, setGenre] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) return;

    await fetch(`${API}/movies`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: title.trim(),
        year: year || undefined,
        genre: genre.trim() || undefined,
        imageUrl: imageUrl.trim() || undefined,
      }),
    });

    setTitle("");
    setYear("");
    setGenre("");
    setImageUrl("");
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-left">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Movie title"
        required
        className="px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400"
      />
      <input
        type="number"
        value={year}
        onChange={(e) => setYear(Number(e.target.value))}
        placeholder="Year"
        className="px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400"
      />
      <input
        type="text"
        value={genre}
        onChange={(e) => setGenre(e.target.value)}
        placeholder="Genre"
        className="px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400"
      />
      <input
        type="url"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
        placeholder="Image URL"
        className="px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400"
      />
      <button
        type="submit"
        className="px-6 py-2 bg-white/10 text-white rounded-full font-semibold hover:bg-[#FAF1E1]/30 transition"
      >
        Add Movie
      </button>
    </form>
  );
}
