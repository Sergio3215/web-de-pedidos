"use client"

import { useEffect, useState } from 'react';
import { useSettings } from '../../Context/Settings/settingsContext';
import CreateGrilla from './createGrilla';

const { getMonoColor, getNameColorARGB } = require('adaptive-color');

export default function Grilla({ header, grillaBody, label }) {

    const { getDB, colorButton } = useSettings();

    const [colorBtn, setColorButton] = useState("#0000");


    const [showModal, setShowModal] = useState(false);

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

    const showForm = () => {
        setShowModal(true);
    }


    return (
        <>
            {
                showModal ?
                    <CreateGrilla fields={header} setShowModal={setShowModal} />
                    :
                    <></>
            }
            <div className="grilla--button">
                <button style={Styled.btn} onClick={() =>{
                    showForm();
                }}>Crear {label}</button>
            </div>
            <div id="grilla--container">
                <div id="grilla--header">
                    {
                        header.map((title, index) => {
                            return <div key={index}>{title}</div>
                        })
                    }
                </div>
                <div id="grilla--table">
                    {
                        grillaBody.length == 0 ?
                            <div>No hay productos disponibles</div>
                            :
                            grillaBody.map((bd, index) => {
                                return <div key={index}>{bd}</div>
                            })
                    }
                </div>
            </div>
        </>
    )
}
