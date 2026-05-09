import React from "react";
import { useNavigate } from "react-router-dom";

function AlbumCard({ album }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/album/${album._id}`)}
      className="group relative bg-zinc-800/30 border border-white/5 p-4 rounded-2xl hover:bg-zinc-800/80 transition-all duration-300 cursor-pointer mb-4"
    >
      <div className="flex items-center gap-5">
        <div className="w-16 h-16 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 rounded-xl flex items-center justify-center shadow-2xl group-hover:rotate-6 transition-transform">
          <span className="text-3xl">💿</span>
        </div>
        
        <div className="flex-1 min-w-0">
          <h3 className="text-white font-bold text-lg truncate group-hover:text-purple-400 transition-colors">
            {album.title}
          </h3>
          <p className="text-zinc-400 text-sm mt-0.5">{album.artist?.username}</p>
          <div className="mt-2 inline-block px-3 py-1 rounded-full bg-zinc-900 text-zinc-500 text-[10px] font-black uppercase tracking-tighter">
            {album.musics?.length} Tracks
          </div>
        </div>

        <div className="opacity-0 group-hover:opacity-100 transition-all translate-x-2 group-hover:translate-x-0">
          <svg className="w-6 h-6 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
          </svg>
        </div>
      </div>
    </div>
  );
}

export default AlbumCard;