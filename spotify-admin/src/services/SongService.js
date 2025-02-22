import axiosClient from "./BaseHttpInstance";

const getSongs = async () => {
    try {
        const response = await axiosClient.get('/songs/list');
        console.log(response.data);

        return response.data;
    } catch (error) {
        console.log(`Error fetching songs ${error}`);
        throw error;
    }
};

const addSong = async (data) => {
    try {
        const response = await axiosClient.post('/songs/add', data);
        console.log(response.data);

        return response.data;        
    } catch (error) {
        console.log(`Error adding song ${error}`);
        throw error;
    }
}

const deleteSong = async (id) => {
    try {
        const response = await axiosClient.delete(`/songs/remove/${id}`);
        console.log(response.data);

        return response.data;
    } catch (error) {
        console.log(`Error deleting song ${error}`);
        throw error;
    }
}

export { getSongs, addSong, deleteSong };