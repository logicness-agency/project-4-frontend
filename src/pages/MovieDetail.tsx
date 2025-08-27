import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

type Comment = { id: number; text: string; createdAt: string };
type Movie = {
  id: number;
  title: string;
  year?: number;
  genre?: string;
  imageUrl?: string;
  comments: Comment[];
};

const API = import.meta.env.VITE_API_URL ?? "http://localhost:3000";

export default function MovieDetail() {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);
  const [text, setText] = useState("");

  async function loadMovie() {
    try {
      const res = await fetch(`${API}/movies/${id}`);
      const data = await res.json();
      setMovie(data);
    } finally {
      setLoading(false);
    }
  }

  async function addComment(e: React.FormEvent) {
    e.preventDefault();
    if (!text.trim()) return;
    await fetch(`${API}/movies/${id}/comments`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });
    setText("");
    loadMovie();
  }

  useEffect(() => {
    loadMovie();
  }, [id]);

  if (loading)
    return (
      <main className="min-h-screen bg-black text-white grid place-items-center">
        <p>Loading…</p>
      </main>
    );

  if (!movie)
    return (
      <main className="min-h-screen bg-black text-white grid place-items-center">
        <p>Movie not found</p>
      </main>
    );

  return (
    <main className="min-h-screen bg-black text-white px-4 py-8 flex flex-col items-center">
      <div className="w-full max-w-sm bg-[#1c1c1e]/80 backdrop-blur-sm border border-gray-700 rounded-xl shadow-xl p-5">
        <h1 className="text-xl font-semibold mb-3 text-center">{movie.title}</h1>

        {movie.imageUrl && (
          <div className="flex justify-center mb-4">
            <img
              src={movie.imageUrl}
              alt={movie.title}
              className="max-h-64 w-auto rounded-md shadow"
            />
          </div>
        )}

        <p className="text-gray-400 mb-4 text-center text-sm">
          {movie.year ?? "Unknown year"} • {movie.genre ?? "Unknown genre"}
        </p>

        <h2 className="text-base font-medium mb-2">Comments</h2>
        <ul className="space-y-2 mb-3">
          {movie.comments.map((c) => (
            <li
              key={c.id}
              className="bg-white/5 border border-white/10 rounded-md px-3 py-1.5 text-sm"
            >
              {c.text}
              <span className="block text-xs text-gray-500">
                {new Date(c.createdAt).toLocaleString()}
              </span>
            </li>
          ))}
          {movie.comments.length === 0 && (
            <p className="text-gray-500 text-sm">No comments yet</p>
          )}
        </ul>

        <form onSubmit={addComment} className="flex gap-2">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Write a comment…"
            className="flex-1 px-3 py-1.5 text-sm rounded-md bg-white/10 border border-white/20 
                       text-white placeholder-gray-400 focus:outline-none focus:ring-1 
                       focus:ring-[#FAF1E1]/30"
          />
          <button
            type="submit"
            className="px-3 py-1.5 text-sm bg-white/10 rounded-md font-medium hover:bg-[#FAF1E1]/30 transition"
          >
            Add
          </button>
        </form>
      </div>
    </main>
  );
}