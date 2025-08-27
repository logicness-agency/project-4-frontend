import { useState } from "react";

export default function AddMovieForm() {
  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const [genre, setGenre] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    await fetch("http://localhost:3000/movies", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        year: year ? Number(year) : undefined,
        genre,
        imageUrl: imageUrl.trim() || undefined,
      }),
    });

    setTitle("");
    setYear("");
    setGenre("");
    setImageUrl("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input
        type="text"
        placeholder="Movie Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="p-3 rounded-lg bg-white/10 text-white placeholder-gray-300 border border-white/20 focus:outline-none"
        required
      />
      <input
        type="number"
        placeholder="Year"
        value={year}
        onChange={(e) => setYear(e.target.value)}
        className="p-3 rounded-lg bg-white/10 text-white placeholder-gray-300 border border-white/20 focus:outline-none"
      />
      <input
        type="text"
        placeholder="Genre"
        value={genre}
        onChange={(e) => setGenre(e.target.value)}
        className="p-3 rounded-lg bg-white/10 text-white placeholder-gray-300 border border-white/20 focus:outline-none"
      />
      <input
        type="url"
        placeholder="Image URL"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
        className="p-3 rounded-lg bg-white/10 text-white placeholder-gray-300 border border-white/20 focus:outline-none"
      />

      <button
        type="submit"
        className="mt-2 px-4 py-2 rounded-full bg-white/10 text-white font-semibold hover:bg-[#FAF1E1]/30 transition"
      >
        Add Movie
      </button>
    </form>
  );
}
