import axiosClient from "./BaseHttpInstance";

const getAlbums = async () => {
    try {
        const response = await axiosClient.get('/albums/list');
        console.log(response.data);

        return response.data;
    } catch (error) {
        console.log(`Error fetching albums ${error}`);
        throw error;
    }
};

const addAlbum = async (data) => {
    try {
        const response = await axiosClient.post('/albums/add', data);
        console.log(response.data);

        return response.data;        
    } catch (error) {
        console.log(`Error creating album ${error}`);
        throw error;
    }
}

const deleteAlbum = async (id) => {
    try {
        const response = await axiosClient.delete(`/albums/remove/${id}`);
        console.log(response.data);

        return response.data;
    } catch (error) {
        console.log(`Error deleting album ${error}`);
        throw error;
    }
}

export { getAlbums, addAlbum, deleteAlbum };