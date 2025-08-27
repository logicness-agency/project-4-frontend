export default function About() {
    return (
        
        <main className="min-h-screen bg-black text-white flex items-center justify-center px-6">
            <div className="max-w-2xl bg-[#1c1c1e]/80 backdrop-blur-sm border border-gray-700 rounded-lg shadow-lg p-8 text-center">
                <h1 className="text-3xl font-bold mb-4">About</h1>
                <p className="text-gray-300 leading-relaxed">
                    This project is the final milestone of my Web Developer Bootcamp.
                    It’s a full-stack movie tracker and rating app where you can add new movies,
                     edit details and leave ratings.
                </p>
            </div>
        </main>
    );
}