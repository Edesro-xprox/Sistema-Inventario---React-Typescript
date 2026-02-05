import axiosInstance from '../api/axios.instance';

export const findGetByUserName = async (credentials: any) => {
    try {
        const response = await axiosInstance.post(`/auth/login`, credentials);
        return response.data;
    } catch (error) {
        console.error(`Error fetching data for collection ${credentials.user}:`, error);
        throw error;
    }
};
