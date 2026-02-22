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

    const patchProductData = useCallback(async (productId: any, status: any) =>{
        try{
            const res = await patchProduct(productId, status);
            getProductData();
            return res;
        }catch(e: any){
            console.error(e);
        }
    },[patchProduct, getProductData]);

    const postProductData = useCallback(async (productData: any) =>{
        try{
            const res = await postProduct(productData);
            getProductData();
            return res;
        }catch(e: any){
            console.error(e);
        }
    },[postProduct, getProductData]);

    const putProductData = useCallback(async (productId: any, productData: any) =>{
        try{
            const res = await putProduct(productId, productData);
            getProductData();
            return res;
        }catch(e: any){
            console.error(e);
        }
    },[putProduct, getProductData]);

    
    return {
        products,
        patchProductData,
        postProductData,
        putProductData
    }
}

export default ProductApi;
