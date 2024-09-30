"use client"
import { useEffect, useState } from 'react';
import { settingContext } from './settingsContext';

export const SettingsProvider = ({ children }) => {

    const [bodyColor, setBody] = useState('');
    const [colorBack, setColorBack] = useState('');
    const [colorButton, setColorButton] = useState('');

    const createDB = async (colorHeader, colorBody, colorBackground, colorButton, logo_id, user) => {
        const myHeader = new Headers();
        myHeader.append('Content-Type', 'application/json');
        const ftch = await fetch('api/setting', {
            method: 'POST',
            body: JSON.stringify({
                colorHeader: colorHeader,
                colorBody: colorBody,
                colorBackground: colorBackground,
                colorButton: colorButton,
                logo_id: logo_id,
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

        if (data.result.length != 0) {
            const { colorBackground, colorBody } = data.result[0];
            setBody(colorBody);
            setColorBack(colorBackground);
            setColorButton(colorButton)
        }

        return data;
    }

    useEffect(() => {
        getDB();
    }, []);
    
    useEffect(() => {

    }, [colorBack, bodyColor, colorButton])

    const saveDB = async (colorHeader, colorBody, colorBackground, colorButton, logo_id, user, id) => {
        const myHeader = new Headers();
        myHeader.append('Content-Type', 'application/json');
        const ftch = await fetch('api/setting', {
            method: 'PUT',
            body: JSON.stringify({
                colorHeader: colorHeader,
                colorBody: colorBody,
                colorBackground: colorBackground,
                colorButton: colorButton,
                user: user,
                id: id,
                logo_id: logo_id
            }),
            headers: myHeader
        });
        const data = await ftch.json();
        return data;
    }

    const updateEnviroment = (value, place) => {
        switch (place) {
            case 'body':
                setBody(value);
                break;
            case 'background':
                setColorBack(value);
                break;
            case 'button':
                setColorButton(value);
                break;
            default:
                break;
        }
    }


    return (
        <settingContext.Provider value={{ createDB, getDB, saveDB, updateEnviroment, bodyColor, colorBack, colorButton }}>
            {children}
        </settingContext.Provider>
    )
}