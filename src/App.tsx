import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AddMovie from "./pages/AddMovie";
import Movies from "./pages/Movies";
import About from "./pages/About";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import MovieDetail from "./pages/MovieDetail";
import EditMovie from "./pages/EditMovie";

export default function App() {
  return (
 <div style={{ minHeight: "100vh", background: "#000", color: "#fff" }}>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/add-movie" element={<AddMovie />} />
        <Route path="/about" element={<About />} />
        <Route path="/movies/:id" element={<MovieDetail />} />
         <Route path="/movies/:id/edit" element={<EditMovie />} />
        <Route path="*" element={<div className="p-6">Not found</div>} />
      </Routes>
      <Footer />
    </div>
  );
}

