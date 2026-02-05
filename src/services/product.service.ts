import axiosInstance from '../api/axios.instance';

const getProductAll = async () => {
    try {
        const response = await axiosInstance.get('/product');
        return response.data;
    } catch (error) {
        console.error(`Error fetching products`, error);
        throw error;
    }
};

const postProduct = async (productData: any) => {
    try{
        const response = await axiosInstance.post('/product', productData);
        return response.data;
    }catch(error){
        console.error(`Error posting product`, error);
    }
}

const putProduct = async (productId: any, productData: any) => {
    try{
        const response = await axiosInstance.put(`/product/${productId}`, productData);
        return response.data;
    }catch(error){
        console.error(`Error updating product`, error);
    }
}

const patchProduct = async (productId: any, status: any) => {
    try{
        const response = await axiosInstance.patch(`/product/${productId}/${status}`);
        return response.data;
    }catch(error){
        console.error(`Error patching product`, error);
    }
}

export { 
    getProductAll,
    postProduct,
    putProduct,
    patchProduct
};