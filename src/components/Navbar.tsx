import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="w-full bg-black/80 text-white px-4 py-2 flex items-center justify-center space-x-4 shadow-md backdrop-blur-sm">
      <Link
        to="/"
        className="px-2 py-1 rounded-md text-sm hover:bg-[#FAF1E1]/30 transition"
      >
        Home
      </Link>
      <Link
        to="/movies"
        className="px-2 py-1 rounded-md text-sm hover:bg-[#FAF1E1]/30 transition"
      >
        All Movies
      </Link>
      <Link
        to="/add-movie"
        className="px-2 py-1 rounded-md text-sm hover:bg-[#FAF1E1]/30 transition"
      >
        Add Movie
      </Link>
      <Link
        to="/about"
        className="px-2 py-1 rounded-md text-sm hover:bg-[#FAF1E1]/30 transition"
      >
        About
      </Link>
    </nav>
  );
}
