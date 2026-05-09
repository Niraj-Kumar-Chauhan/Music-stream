import axios from "axios";
import React, { useEffect, useState } from "react";

function Musics({ isCheckbox = false, onSelect }) {
  const [songs, setSongs] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await axios.get("http://localhost:3000/api/music");
        setSongs(result.data.musics);
      } catch (err) {
        setError("Failed to load music");
      }
    }
    fetchData();
  }, []);

  return (
    <div className="space-y-3">
      {error && <p className="text-red-400 text-xs text-center">{error}</p>}
      {songs.map((song, index) => (
        <div
          key={song._id}
          className="group flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-2xl bg-white/[0.03] hover:bg-white/[0.08] transition-all border border-transparent hover:border-white/5 shadow-sm"
        >
          <div className="flex items-center gap-4">
            <span className="text-zinc-600 text-sm font-mono">{String(index + 1).padStart(2, '0')}</span>
            <div className="min-w-0">
              <p className="text-zinc-100 font-semibold truncate group-hover:text-purple-400 transition-colors">{song.title}</p>
              <p className="text-xs text-zinc-500">{song.artist?.username}</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {isCheckbox && (
              <input
                type="checkbox"
                className="w-5 h-5 accent-purple-500 rounded-md cursor-pointer"
                onChange={(e) => onSelect && onSelect(song, e.target.checked)}
              />
            )}
            <audio 
              controls 
              className="h-8 w-full md:w-56 opacity-60 hover:opacity-100 transition-opacity invert hue-rotate-180"
            >
              <source src={song.uri} type="audio/mpeg" />
            </audio>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Musics;