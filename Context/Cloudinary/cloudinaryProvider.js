"use client"
import { useState } from 'react';
import { cloudinaryContext } from './cloudinaryContext';

export const CloudinaryProvider = ({ children }) => {

    const getCloudinary = async () => {
        const ftch = await fetch('api/cloudinary');
        const data = await ftch.json();
        return data;
    }

    return (
        <cloudinaryContext.Provider value={{ getCloudinary }}>
            {children}
        </cloudinaryContext.Provider>
    )
}