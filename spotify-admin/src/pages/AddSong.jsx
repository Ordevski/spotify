import { useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { toast } from 'react-toastify';
import { getAlbums } from "../services/AlbumService";
import { addSong } from "../services/SongService";

const AddAlbum = () => {
    const [song, setSong] = useState(false);
    const [image, setImage] = useState(false);
    const [name, setName] = useState('');
    const [desc, setDesc] = useState('');
    const [album, setAlbum] = useState("none");
    const [loading, setLoading] = useState(false);
    const [albumData, setAlbumData] = useState([]);

    const loadAlbumData = async () => {
        try {
            const response = await getAlbums();

            if(response.data.success) {
                setAlbumData(response.data.albums);
            }
            
        } catch (error) {   
            console.log(error);
            toast.error("Error loading albums");            
        }
    }

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const formData = new FormData();

            formData.append('name', name);
            formData.append('desc', desc);
            formData.append('image', image);
            formData.append('audio', song);
            formData.append('album', album);

            const response = await addSong(formData);

            if (response.data.success) {
                toast.success("Song Added");
                setName("");
                setDesc("");
                setImage(false);
                setSong(false);
            } else {
                toast.error("Something went wrong");
            }
        } catch (error) {
            console.log('error', error)
            toast.error("Song Add Error");
        }
        setLoading(false);
    }

    useEffect(() => {
        loadAlbumData();
    }, []);

    return loading ? (
        <div className="grid place-items-center min-h-[80vh]">
            <div className="w-16 h-16 place-self-center border-4 border-gray-400 border-t-green-800 rounded-full animate-spin"></div>
        </div>
    ) : (
        <form onSubmit={onSubmitHandler} className="flex flex-col items-start gap-8 text-gray-600">
            <div className="flex gap-8">
                <div className="flex flex-col gap-4">
                    <p>Upload Song</p>
                    <input onChange={(e) => setSong(e.target.files[0])} type="file" id="song" accept="audio/*" hidden />
                    <label htmlFor="song">
                        <img src={song ? assets.upload_added : assets.upload_song} className="w-24 cursor-pointer" alt="upload_song" />
                    </label>
                </div>
                <div className="flex flex-col gap-4">
                    <p>Upload Song</p>
                    <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" accept="image/*" hidden />
                    <label htmlFor="image">
                        <img src={image ? URL.createObjectURL(image) : assets.upload_area} className="w-24 cursor-pointer" alt="upload_area" />
                    </label>
                </div>
            </div>
            <div className="flex flex-col gap-2 5">
                <p>Song Name</p>
                <input onChange={(e) => setName(e.target.value)} type="text" value={name} className="bg-transparent outline-green-600 border-2 border-gray-400 p-2.5 w-[max(40vw,250px)]" placeholder="Type Here" required/>
            </div>
            <div className="flex flex-col gap-2 5">
                <p>Description</p>
                <input onChange={(e) => setDesc(e.target.value)} type="text" value={desc} className="bg-transparent outline-green-600 border-2 border-gray-400 p-2.5 w-[max(40vw,250px)]" placeholder="Type Here" required/>
            </div>
            <div className="flex flex-col gap-2.5">
                <p>Album</p>
                <select onChange={(e) => setAlbum(e.target.value)} defaultValue={album} className="bg-transparent outline-green-600 border-2 border-gray-400 p-2.5 w-[250px]">
                    <option value="none">None</option>
                    {albumData.map((item, index) => (
                        <option key={index} value={item.name}>{item.name}</option>
                    ))}
                </select>
            </div>


            <button type="submit" className="text-base bg-black text-white py-2.5 px-14 cursor-pointer">Add</button>
        </form>
    );
}

export default AddAlbum;