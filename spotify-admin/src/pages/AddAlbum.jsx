import axios from "axios";
import { useState } from "react";
import { url } from "../App";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";

const AddAlbum = () => {
    const [image, setImage] = useState(false);
    const [color, setColor] = useState("#121212");
    const [name, setName] = useState("");
    const [desc, setDesc] = useState("");
    const [loading, setLoading] = useState(false);

    const onSubmitHandler = () => {
        console.log("Not yet implemented!");
    }

    return loading ? (
        <div className="grid place-items-center min-h-[80vh]">
            <div className="w-16 h-16 place-self-center border-4 border-gray-400 border-t-green-800 rounded-full animate-spin"></div>
        </div>
    ) : (
        <form onSubmit={onSubmitHandler} className="flex flex-col items-start gap-8 text-gray-600">
            <div className="flex gap-8">
                <div className="flex flex-col gap-4">
                    <p>Upload Image</p>
                    <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" accept="image/*" hidden />
                    <label htmlFor="image">
                        <img src={image ? URL.createObjectURL(image) : assets.upload_area} className="w-24 cursor-pointer" alt="upload_area" />
                    </label>
                </div>
            </div>
            <div className="flex flex-col gap-2.5">
                <p>Album Name</p>
                <input onChange={(e) => setName(e.target.value)} value={name} type="text" className="bg-transparent outline-green-600 border-2 border-gray-400 p-2.5 w-[max(40vw,250px)]" placeholder="Type Here" required />
            </div>
            <div className="flex flex-col gap-2.5">
                <p>Album Description</p>
                <input onChange={(e) => setDesc(e.target.value)} value={desc} type="text" className="bg-transparent outline-green-600 border-2 border-gray-400 p-2.5 w-[max(40vw,250px)]" placeholder="Type Here" required />
            </div>
            <div className="flex flex-col gap-3">
                <p>Background Colour</p>
                <input onChange={(e) => setColor(e.target.value)} value={color} type="color" />
            </div>

            <button type="submit" className="text-base bg-black text-white py-2.5 px-14 cursor-pointer">Add</button>
        </form>
    )
}

export default AddAlbum;