import React, { useEffect, useState } from "react";
import axios from "axios";
import AlbumCard from "./AlbumCard";

function Albums() {
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const result = await axios.get(
          "https://music-stream-ub1v.onrender.com/api/music/albums"
        );

        setAlbums(result.data.albums);
      } catch (err) {
        setError(err?.response?.data?.message || "Something went wrong");
      }

      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading)
    return (
      <div className="text-zinc-400 text-center py-10 animate-pulse">
        Loading albums...
      </div>
    );

  if (error)
    return <div className="text-red-400 text-center">{error}</div>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
      {albums.map((album) => (
        <AlbumCard key={album._id} album={album} />
      ))}
    </div>
  );
}

export default Albums;