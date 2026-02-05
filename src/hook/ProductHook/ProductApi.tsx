import { useCallback, useEffect, useState } from "react";
import { getProductAll, patchProduct, postProduct, putProduct } from '../../services/product.service.ts';

function ProductApi(){
    const [products, setProducts] = useState([]);

    const getProductData = useCallback(async () =>{
        try{
            const productData = await getProductAll();
            setProducts(productData);
            return productData;
        }catch(e: any){
            console.error(e);
        }
    },[]);

    useEffect(() =>{
        getProductData();
    },[]);

    const patchProductData = async (productId: any, status: any) =>{
        try{
            const res = patchProduct(productId, status);
            getProductData();
            return res;
        }catch(e: any){
            console.error(e);
        }
    }

    const postProductData = async (productData: any) =>{
        try{
            const res = await postProduct(productData);
            getProductData();
            return res;
        }catch(e: any){
            console.error(e);
        }
    }

    const putProductData = async (productId: any, productData: any) =>{
        try{
            const res = await putProduct(productId, productData);
            getProductData();
            return res;
        }catch(e: any){
            console.error(e);
        }
    }

    
    return {
        products,
        patchProductData,
        postProductData,
        putProductData
    }
}

export default ProductApi;
