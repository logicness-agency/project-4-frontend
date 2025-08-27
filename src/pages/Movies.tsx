import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

type Movie = {
  id: number;
  title: string;
  year?: number;
  genre?: string;
  imageUrl?: string;
  _count?: { comments: number };
};

const API = import.meta.env.VITE_API_URL ?? "http://localhost:3000";

export default function Movies() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${API}/movies`);
        const data = await res.json();
        setMovies(data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen bg-black text-white grid place-items-center">
        <p className="text-gray-400">Loading movies…</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white px-6 py-10">
      <h1 className="text-3xl font-bold mb-8 text-center">All Movies</h1>

      {movies.length === 0 ? (
        <p className="text-center text-gray-400">No movies yet. Add one!</p>
      ) : (
        <div
          className="
            grid gap-5
            grid-cols-2
            sm:grid-cols-3
            md:grid-cols-4
            lg:grid-cols-5
            xl:grid-cols-6
          "
        >
          {movies.map((m) => (
            <article
              key={m.id}
              className="bg-[#1c1c1e]/80 backdrop-blur-sm border border-gray-700 rounded-xl shadow-lg p-4 flex flex-col"
            >
              <div className="aspect-[2/3] w-full overflow-hidden rounded-md mb-4">
                <img
                  src={
                    m.imageUrl?.trim()
                      ? m.imageUrl
                      : "https://via.placeholder.com/600x900?text=No+Image"
                  }
                  alt={m.title}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-[1.02]"
                />
              </div>

              <h2 className="text-lg font-semibold leading-snug">{m.title}</h2>
              <p className="text-sm text-gray-400">
                {m.year ?? "Unknown year"} • {m.genre ?? "Unknown genre"}
              </p>

              {m._count?.comments !== undefined && (
                <p className="text-xs text-gray-500 mt-2">
                  {m._count.comments} comment{m._count.comments === 1 ? "" : "s"}
                </p>
              )}

              <div className="mt-4 flex gap-2">
                <Link
                  to={`/movies/${m.id}/edit`}
                  className="px-3 py-1 rounded-full bg-white/10 hover:bg-[#FAF1E1]/30 transition text-sm"
                >
                  Edit
                </Link>
                <Link
                  to={`/movies/${m.id}`}
                  className="px-3 py-1 rounded-full bg-white/10 hover:bg-[#FAF1E1]/30 transition text-sm"
                >
                  Comments
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}
