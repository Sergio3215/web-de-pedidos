"use client"
import { useEffect, useState } from 'react';
import { productContext } from './productContext';


export default function ProductProvider({ children }) {

    const [product, setProduct] = useState([]);

    const getProduct = async () => {
        const ftch = await fetch('/api/products');
        const data = await ftch.json();
        // console.log(data);
        setProduct(data);
    }

    useEffect(() => {
        getProduct();
    }, [])

    return (
        <productContext.Provider value={{ product }}>
            {children}
        </productContext.Provider>
    )
}