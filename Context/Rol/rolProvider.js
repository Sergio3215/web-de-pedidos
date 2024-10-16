"use client"
import { useEffect, useState } from 'react';
import { rolContext } from './rolContext';


export default function RolProvider({ children }) {

    const [rol, setRol] = useState([]);

    const getRol = async () => {
        const ftch = await fetch('/api/rol');
        const res = await ftch.json();
        setRol(res.data);
    }

    useEffect(() => {
        getRol();
    }, []);

    
    useEffect(() => {
    }, [rol])

    return (
        <rolContext.Provider value={{ rol, getRol }}>
            {children}
        </rolContext.Provider>
    )
}