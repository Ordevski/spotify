import { useParams } from "react-router-dom";
import Navbar from "./Navbar";
import { albumsData, assets } from "../assets/assets";

const DisplayAlbum = () => {
    const { id } = useParams();
    const albumData = albumsData[id];
    return (
        <>
            <Navbar />
            <div className="mt-10 flex gap-8 flex-col md:flex-row md:items-end">
                <img className='w-48 rounded' src={albumData.image} alt="" />
                <div className="flex flex-col gap-3">
                    <p>Playlist</p>
                    <h2 className='text-5xl font-bold mb-2 md:text-7xl'>{albumData.name}</h2>
                    <h4>{albumData.desc}</h4>
                    <p className='flex'>
                        <div>
                            <img className='inline-block w-5 mr-2' src={assets.spotify_logo} alt="spotify_logo" />
                            <b className='mr-2'>Spotify</b>
                        </div>
                        <div className='text-gray-300'>
                            <span>• 1,323,154 likes</span>
                            <b> • 50 songs </b>
                            <span>- about 2 hr. 30 min.</span>
                        </div>
                    </p>
                </div>
            </div>
            <div className="grid grid-cols-3 sm:grid-cols-[0.5fr_2fr_2fr_0.5fr] mt-10 mb-4 pl-2 text-[#a7a7a7]">
                <p>#<b className='mr-4'>Title</b></p>
                <p>Name</p>
                <p className='hidden sm:block'>Date Added</p>
                <img className='m-auto w-4' src={assets.clock_icon} alt="clock_icon" />
            </div>
        </>
    );
}

export default DisplayAlbum;