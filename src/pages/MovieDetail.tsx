import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

type Comment = { id: number; text: string; createdAt: string };
type Movie = {
  id: number; title: string; year?: number; genre?: string; imageUrl?: string;
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

  useEffect(() => { loadMovie(); }, [id]);

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

  if (loading) {
    return (
      <main className="min-h-screen bg-black text-white grid place-items-center">
        <p className="text-gray-400">Loading…</p>
      </main>
    );
  }
  if (!movie) {
    return (
      <main className="min-h-screen bg-black text-white grid place-items-center">
        <p>Movie not found</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white px-4 py-10">
      <div className="w-full max-w-3xl mx-auto bg-[#1c1c1e]/80 backdrop-blur-sm border border-gray-700 rounded-2xl shadow-lg p-6">
        {/* Header + Actions */}
        <div className="flex items-start justify-between gap-4 mb-4">
          <div>
            <h1 className="text-3xl font-bold">{movie.title}</h1>
            <p className="text-gray-400">
              {movie.year ?? "Unknown year"} • {movie.genre ?? "Unknown genre"}
            </p>
          </div>
          <Link
            to={`/movies/${movie.id}/edit`}
            className="px-3 py-1 rounded-full bg-white/10 hover:bg-[#FAF1E1]/30 transition text-sm"
          >
            Edit
          </Link>
        </div>

        {/* Poster – festes 2:3 Seitenverhältnis, niemals riesig */}
        <div className="mb-6 rounded-xl overflow-hidden bg-white/5 border border-white/10">
          <div className="aspect-[2/3] w-full">
            <img
              src={
                movie.imageUrl?.trim()
                  ? movie.imageUrl
                  : "https://via.placeholder.com/600x900?text=No+Image"
              }
              alt={movie.title}
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        {/* Comments */}
        <h2 className="text-xl font-semibold mb-3">Comments</h2>
        {movie.comments.length === 0 ? (
          <p className="text-gray-500 mb-4">No comments yet</p>
        ) : (
          <ul className="space-y-2 mb-4">
            {movie.comments.map((c) => (
              <li
                key={c.id}
                className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm"
              >
                {c.text}
                <span className="block text-xs text-gray-500">
                  {new Date(c.createdAt).toLocaleString()}
                </span>
              </li>
            ))}
          </ul>
        )}

        {/* Add comment */}
        <form onSubmit={addComment} className="flex gap-2">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Write a comment…"
            className="flex-1 px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FAF1E1]/30"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-white/10 rounded-lg font-semibold hover:bg-[#FAF1E1]/30 transition"
          >
            Add
          </button>
        </form>
      </div>
    </main>
  );
}
