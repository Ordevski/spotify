import { v2 as cloudinary } from 'cloudinary';
import Album from '../models/Album.js';
import Song from '../models/Song.js';

const addAlbum = async (req, res) => {
    try {
        const { name, desc, bgColor } = req.body;
        const imageFile = req.file;

        if(!name || !desc || !bgColor || !imageFile) {
            return res.status(500).json({
                success: false,
                message: "Please provide all fields."
            });
        }
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" });

        const albumData = { name, desc, bgColor, image: imageUpload.secure_url };
        const album = Album(albumData);

        await album.save();
        res.status(201).json({
            success: true,
            message: "Album sucessfully saved."
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({ 
            success: false, 
            message: "Error in ADD ALBUM API" 
        });
    }
}

const listAlbum = async (req, res) => {
    try {
        const allAlbums = await Album.find({});

        if(!allAlbums) {
            return res.status(404).json({
                success: false,
                message: "No albums found.",
            });
        }

        res.status(200).json({
            success: true,
            message: "Albums retrieved successfully.",
            allAlbums
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error in LIST ALBUMS API.",
        });
    }
}

const removeAlbum = async (req, res) => {
    try {
        const { id } = req.params;
        if(!id){
            return res.status(404).json({
                success: false,
                message: "Please provide an ID."
            });
        }

        const album = await Album.findById({ _id: id });
        const albumSongs = await Song.find({ album: album.name });

        albumSongs.map(async (item) => {
            await Song.findByIdAndDelete({ _id: item._id });
        });
        await Album.findByIdAndDelete({ _id: id });

        res.status(200).json({ 
            success: true, 
            message: "Album removed successfully." });
    } catch (error) {
        console.log('Failed at removeAlbum, ', error);
        res.status(400).json({ 
            success: false, 
            message: "Error in ALBUM REMOVE API"});
    }
}

export { addAlbum, listAlbum, removeAlbum }