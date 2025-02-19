import { v2 as cloudinary } from 'cloudinary';
import Song from '../models/Song.js';

const addSong = async (req, res) => {
    try {
        const { name, desc, album } = req.body;
        const audioFile = req.files.audio[0];
        const imageFile = req.files.audio[0];

        if(!name || !desc || !album || !audioFile || !imageFile) {
            return res.status(500).json({
                success: false,
                message: "Please provide all fields."
            });
        }

        const audioUpload = await cloudinary.uploader.upload(audioFile.path, {resource_type: "video"});
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, {resource_type: "image"});
        const duration = `${Math.floor(audioUpload.duration / 60)}:${Math.floor(audioUpload.duration % 60)}`;

        const songData = { name, desc, album, duration, image: imageUpload.secure_url, file: audioUpload.secure_url };
        const song = Song(songData);

        await song.save();

        res.status(201).json({
            success: true,
            message: "Song successfully saved.",
            song
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error in ADD SONG API.",
        });
    }
}

const listSong = async (req, res) => {
    try {
        const allSongs = await Song.find({});
        if(!allSongs) {
            return res.status(404).json({
                success: false,
                message: "No songs found.",
            });
        }

        res.status(200).json({
            success: true,
            message: "Songs retrieved successfully.",
            allSongs
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error in LIST SONGS API.",
        });
    }
}

const removeSong = async (req, res) => {
    try {
        const { id } = req.params;
        if(!id){
            return res.status(404).json({
                success: false,
                message: "Please provide an ID."
            });
        }

        await Song.findByIdAndDelete({ _id: id });
        res.status(200).json({
            success: true,
            message: "Song successfully deleted."
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error in REMOVE SONG API.",
        });
    }
}

export { addSong, listSong, removeSong }