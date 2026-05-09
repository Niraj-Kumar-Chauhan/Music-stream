const express = require('express');
const cors = require('cors')
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/auth.routes');
const musicRoutes = require('./routes/music.routes');



const app = express();
// app.use(cors());
app.use(express.json());
app.use(cookieParser());

const allowedOrigins = [
  "http://localhost:5173",
  "https://music-stream-t4lm.vercel.app"
];

app.use(cors({
  origin: true,
  credentials: true
}));

app.use('/api/auth', authRoutes);

app.use('/api/music', musicRoutes);

module.exports = app;