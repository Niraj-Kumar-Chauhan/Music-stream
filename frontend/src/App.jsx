import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Signup from "./components/Signup";
import Login from "./components/Login";
import Home from "./components/Home";
import CreateMusic from "./components/CreateMusic";
import Musics from "./components/Musics";
import CreateAlbum from "./components/CreateAlbum";
import Albums from "./components/Albums";
import AlbumDetail from "./components/AlbumDetail";

function App() {
  return (
    <Router>
      <Routes>

        {/* 🌍 Public Layout */}
        <Route path="/" element={<Home />} />

        {/* 🔐 Auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Signup />} />

        {/* 🎵 User Content */}
        <Route path="/musics" element={<Musics />} />
        <Route path="/albums" element={<Albums />} />
        <Route path="/album/:id" element={<AlbumDetail />} />

        {/* 🎤 Artist Routes */}
        <Route path="/create-music" element={<CreateMusic />} />
        <Route path="/create-album" element={<CreateAlbum />} />

      </Routes>
    </Router>
  );
}

export default App;