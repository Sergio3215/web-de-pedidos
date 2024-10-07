"use client"
import { useEffect, useState } from 'react';
import { productContext } from './productContext';


export default function ProductProvider({ children }) {

    const [product, setProduct] = useState([]);

    const getProduct = async () => {
        const ftch = await fetch('/api/products');
        const res = await ftch.json();
        // console.log(res.data);
        debugger
        setProduct(res.data);
    }

    useEffect(() => {
        getProduct();
    }, []);

    
    useEffect(() => {
    }, [product])

    return (
        <productContext.Provider value={{ product, getProduct }}>
            {children}
        </productContext.Provider>
    )
}