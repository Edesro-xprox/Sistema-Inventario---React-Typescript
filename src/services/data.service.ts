import axiosInstance from '../api/axios.instance';

export const getCollectionData = async (collectionName: string) => {
    try {
        const response = await axiosInstance.get(`/data/${collectionName}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching data for collection ${collectionName}:`, error);
        throw error;
    }
};
