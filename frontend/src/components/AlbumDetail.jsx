import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function AlbumDetail() {
  const { id } = useParams();
  const [album, setAlbum] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await axios.get(
          `https://music-stream-ub1v.onrender.com/api/music/albums/${id}`
        );
        setAlbum(result.data.album);
      } catch (err) {
        setError(err?.response?.data?.message || "Something went wrong!");
      }
      setLoading(false);
    };
    fetchData();
  }, [id]);

  if (loading) return <p className="p-4 text-white">Loading...</p>;
  if (error) return <p className="p-4 text-red-400">{error}</p>;

  const artistNames = [
    ...new Set(album.musics.map((m) => m.artist.username)),
  ];

  return (
    <div className="p-4 sm:p-6 text-white max-w-5xl mx-auto">

      {/* 🔝 Album Info */}
      <div className="bg-gray-900 p-4 sm:p-6 rounded-xl shadow-lg mb-6">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">
          {album.title}
        </h1>

        <p className="text-gray-400 mt-2 text-sm sm:text-base">
          {album.musics.length} Songs
        </p>

        <p className="text-gray-400 text-sm sm:text-base">
          Artists: {artistNames.join(", ")}
        </p>
      </div>

      {/* 🎵 Songs List */}
      <div className="space-y-3">
        {album.musics.map((music, index) => (
          <div
            key={music._id}
            className="bg-gray-800 p-3 sm:p-4 rounded-lg 
                       flex flex-col sm:flex-row 
                       sm:items-center sm:justify-between 
                       gap-3"
          >
            {/* Info */}
            <div className="min-w-0">
              <p className="font-semibold text-sm sm:text-base truncate">
                {index + 1}. {music.title}
              </p>
              <p className="text-xs sm:text-sm text-gray-400 truncate">
                {music.artist.username}
              </p>
            </div>

            {/* Audio */}
            <audio
              controls
              className="w-full sm:w-[220px] md:w-[260px] h-8"
            >
              <source src={music.uri} type="audio/mpeg" />
            </audio>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AlbumDetail;