"use client"
import { useState } from 'react';
import { settingContext } from './settingsContext';

export const SettingsProvider = ({ children }) => {

    const createDB = async (colorHeader, colorBody, colorBackground, user) => {
        const myHeader = new Headers();
        myHeader.append('Content-Type', 'application/json');
        const ftch = await fetch('api/setting', {
            method: 'POST',
            body: JSON.stringify({
                colorHeader: colorHeader,
                colorBody: colorBody,
                colorBackground: colorBackground,
                user: user
            }),
            headers: myHeader
        });
        const data = await ftch.json();
        return data;
    }

    const getDB = async (user) => {
        const ftch = await fetch('api/setting?user=' + user);
        const data = await ftch.json();
        return data;
    }

    const saveDB = async (colorHeader, colorBody, colorBackground, user, id, logo_id) => {
        const myHeader = new Headers();
        myHeader.append('Content-Type', 'application/json');
        const ftch = await fetch('api/setting', {
            method: 'PUT',
            body: JSON.stringify({
                colorHeader: colorHeader,
                colorBody: colorBody,
                colorBackground: colorBackground,
                user: user,
                id: id,
                logo_id : logo_id 
            }),
            headers: myHeader
        });
        const data = await ftch.json();
        return data;
    }

    return (
        <settingContext.Provider value={{ createDB, getDB, saveDB }}>
            {children}
        </settingContext.Provider>
    )
}