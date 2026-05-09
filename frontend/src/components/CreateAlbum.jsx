import React, { useState } from "react";
import Input from "./Input";
import Button from "./Button";
import Musics from "./Musics";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CreateAlbum() {
  const [albumName, setAlbumName] = useState("");
  const [selectedSongs, setSelectedSongs] = useState([]);

  const navigate = useNavigate();
  // checkbox select handler
  const handleSelect = (song, checked) => {
    if (checked) {
      setSelectedSongs((prev) => [...prev, song]);
    } else {
      setSelectedSongs((prev) => prev.filter((s) => s._id !== song._id));
    }
  };

  let handleTextInput = (e) => {
    setAlbumName(e.target.value);
  };

  // form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await axios.post(
        "https://music-stream-ub1v.onrender.com/api/music/album",
        {
          title: albumName,
          musics: selectedSongs,
        },
        {
          withCredentials: true,
        },
      );
      console.log("Album create result = ", result);

      setTimeout(() => {
        navigate("/");
      }, 1000);

    } catch (err) {
      console.log("Error = ", err.response);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <form onSubmit={handleSubmit} className="max-w-5xl mx-auto">
        {/* Top Section */}
        <div className="flex gap-4 mb-8">
          <Input
            name="album"
            type="text"
            placeholder="Enter album name"
            id="album"
            value={albumName}
            onChangeInput={handleTextInput}
          />

          <Button
            text="Create"
            type="submit"
            className="px-6 py-3 rounded-lg bg-gradient-to-r from-purple-500 to-indigo-500 hover:opacity-90 transition"
          />
        </div>

        {/* Music List */}
        <Musics isCheckbox={true} onSelect={handleSelect} />
      </form>
    </div>
  );
}

export default CreateAlbum;
