import { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { getAlbums, deleteAlbum } from "../services/AlbumService";

const ListAlbum = () => {
    const [data, setData] = useState([]);

    const loadAlbumData = async () => {
        try {
            const response = await getAlbums();
    
            if(response.data.success) {
                setData(response.data.albums);
            }
                
        } catch (error) {   
            console.log(error);
            toast.error("Error loading albums");            
        }
    }

    const removeAlbum = async (id) => {
        try {
            const response = await deleteAlbum(id);

            if (response.data.success) {
                toast.success(response.data.message);
                await loadAlbumData();
            }

        } catch (error) {
            console.log('error', error)
            toast.error("Song Remove Error");
        }
    }

    useEffect(() => {
        loadAlbumData();
    }, []);

    return (
        <div>
            <p>All Albums List</p>
            <hr />
            <div>
                <div className="sm:grid hidden grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center justify-items-center gap-2.5 p-3 border border-gray-300 text-sm mr-5 bg-gray-100">
                    <b>Image</b>
                    <b>Name</b>
                    <b>Description</b>
                    <b>Album Colour</b>
                    <b>Action</b>
                </div>
                {data.map((item, index) => {
                    return (
                        <div key={index} className="grid grid-cols-[1fr_1fr_1fr] sm:grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center justify-items-center gap-2.5 p-3 border border-gray-300 text-sm mr-5">
                            <img className='w-12' src={item.image} alt="" />
                            <p>{item.name}</p>
                            <p>{item.desc}</p>
                            <input type="color" value={item.bgColor} />
                            <p className='font-bold cursor-pointer hover:text-red-500' onClick={() => removeAlbum(item.id)}>X</p>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default ListAlbum;