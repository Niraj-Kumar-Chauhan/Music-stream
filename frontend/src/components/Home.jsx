import React from "react";
import { useNavigate } from "react-router-dom";
import Musics from "./Musics";
import Albums from "./Albums";
import axios from "axios";

function Home() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = async () => {
    try {
      await axios.post("https://music-stream-ub1v.onrender.com/api/auth/logout");
      localStorage.removeItem("user");
      navigate("/login");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100 font-sans selection:bg-purple-500/30">
      {/* 🔝 Navbar */}
      <nav className="sticky top-0 z-50 backdrop-blur-md bg-black/40 border-b border-white/5 px-4 sm:px-8 py-4 flex justify-between items-center">
        <h1 
          className="text-xl sm:text-2xl font-black tracking-tighter bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent cursor-pointer"
          onClick={() => navigate("/")}
        >
          🎧 ECHO MUSIC
        </h1>
        
        <div className="flex items-center gap-3 sm:gap-6">
          {!user ? (
            <div className="flex gap-2 sm:gap-4">
              <button onClick={() => navigate("/login")} className="text-sm font-medium hover:text-purple-400 transition">Login</button>
              <button onClick={() => navigate("/register")} className="bg-white text-black px-4 sm:px-6 py-2 rounded-full text-sm font-bold hover:bg-zinc-200 transition shadow-lg">Sign Up</button>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <span className="hidden md:block text-sm text-zinc-400 font-medium">Welcome, {user.username}</span>
              <button onClick={handleLogout} className="border border-red-500/50 text-red-500 px-4 py-1.5 rounded-full text-xs font-semibold hover:bg-red-500 hover:text-white transition">Logout</button>
            </div>
          )}
        </div>
      </nav>

      {/* 🎯 Content Section */}
      <main className="max-w-[1440px] mx-auto p-4 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* 🎵 Trending Songs */}
        <section className="lg:col-span-7 bg-zinc-900/40 border border-white/5 rounded-[2rem] p-6 flex flex-col h-[75vh] backdrop-blur-sm shadow-2xl">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight">Trending Songs</h2>
            {user?.role === "artist" && (
              <button 
                onClick={() => navigate("/create-music")}
                className="bg-purple-600 hover:bg-purple-700 text-white text-xs px-4 py-2.5 rounded-full transition-all hover:scale-105 font-bold shadow-lg shadow-purple-500/20"
              >
                + Upload Music
              </button>
            )}
          </div>
          <div className="overflow-y-auto custom-scrollbar flex-1 pr-1">
            <Musics />
          </div>
        </section>

        {/* 💿 Albums */}
        <section className="lg:col-span-5 bg-zinc-900/40 border border-white/5 rounded-[2rem] p-6 flex flex-col h-[75vh] backdrop-blur-sm shadow-2xl">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight">Top Albums</h2>
            {user?.role === "artist" && (
              <button 
                onClick={() => navigate("/create-album")}
                className="bg-zinc-800 hover:bg-zinc-700 text-white text-xs px-4 py-2.5 rounded-full transition-all border border-white/10 font-bold"
              >
                + New Album
              </button>
            )}
          </div>
          <div className="overflow-y-auto custom-scrollbar flex-1 pr-1">
            <Albums />
          </div>
        </section>
      </main>
    </div>
  );
}

export default Home;