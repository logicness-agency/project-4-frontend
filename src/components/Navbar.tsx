import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="w-full bg-black text-white px-6 py-4 flex items-center justify-center space-x-6 shadow-md">
      <Link
        to="/"
        className="px-3 py-1.5 rounded-md hover:bg-[#FAF1E1]/30 transition"
      >
        Home
      </Link>
      <Link
        to="/movies"
        className="px-3 py-1.5 rounded-md hover:bg-[#FAF1E1]/30 transition"
      >
        All Movies
      </Link>
      <Link
        to="/add-movie"
        className="px-3 py-1.5 rounded-md hover:bg-[#FAF1E1]/30 transition"
      >
        Add Movie
      </Link>
    </nav>
  );
}
