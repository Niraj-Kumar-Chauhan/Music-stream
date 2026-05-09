import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Input from "./Input";
import Button from "./Button";

function CreateMusic() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("music", e.target.music.files[0]);
    formData.append("title", e.target.title.value);

    try {
      setLoading(true);
      await axios.post("https://music-stream-ub1v.onrender.com/api/music/upload", formData, { withCredentials: true });
      navigate("/");
    } catch (err) {
      alert("Upload failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#09090b] flex items-center justify-center p-6 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent">
      <div className="w-full max-w-md bg-zinc-900/50 backdrop-blur-2xl p-8 rounded-[2.5rem] border border-white/5 shadow-2xl">
        <h2 className="text-3xl font-black text-white text-center mb-8">Upload Track 🎶</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <Input accept="audio/*" name="music" type="file" label="Music File" id="file" />
          <Input name="title" type="text" placeholder="Song Title" label="Title" id="title" />
          <Button text={loading ? "Uploading..." : "Publish Song"} type="submit" />
        </form>
      </div>
    </div>
  );
}

export default CreateMusic;