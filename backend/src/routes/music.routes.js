const express = require('express');
const musicController = require('../controllers/music.controller');
const authMiddleware = require('../middleware/auth.middleware');
const multer = require('multer');
const router = express.Router();

const upload = multer({
    storage: multer.memoryStorage()
});

router.post('/upload', authMiddleware.authArtist, upload.single('music'),  musicController.createMusic);

router.post('/album', authMiddleware.authArtist,  musicController.createAlbum);

router.get('/', musicController.getAllMusics);

router.get('/albums', musicController.getAllAlbums)

router.get('/albums/:albumId', musicController.getAlbumById);

module.exports = router;