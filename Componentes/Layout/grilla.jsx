"use client"

import { useEffect, useState } from 'react';
import { useSettings } from '../../Context/Settings/settingsContext';

const { getMonoColor, getNameColorARGB } = require('adaptive-color');

export default function Grilla({ header, grillaBody, label }) {
    
    const { getDB, colorButton } = useSettings();
    
    const [colorBtn, setColorButton] = useState("#0000");
    
    const getMyColorButton = async (user) => {
        let mySetting = await getDB(user);
        if (mySetting.result.length != 0) {
            setColorButton(mySetting.result[0].colorButton);
        }
    }

    useEffect(() => {
        getMyColorButton('test');
    }, []);


    useEffect(() => {
        setColorButton(colorButton);
    }, [colorButton]);

    const Styled = {
        btn: {
            color: getMonoColor(getNameColorARGB(colorBtn)),
            background: colorBtn
        }
    }

    return (
        <>
            <div className="grilla--button">
                <button style={Styled.btn}>Crear {label}</button>
            </div>
            <div id="grilla--container">
                <div id="grilla--header">
                    {
                        header.map((title) => {
                            return <div>{title}</div>
                        })
                    }
                </div>
                <div id="grilla--table">
                    {
                        grillaBody.length == 0 ?
                            <div>No hay productos disponibles</div>
                            :
                            grillaBody.map((bd, index) => {
                                return <div>{bd}</div>
                            })
                    }
                </div>
            </div>
        </>
    )
}
