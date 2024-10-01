"use client"

import { useEffect, useState } from 'react';
import { useSettings } from '../../Context/Settings/settingsContext';
import CreateGrilla from './createGrilla';

const { getMonoColor, getNameColorARGB } = require('adaptive-color');

export default function Grilla({ header, grillaBody, label }) {

    const { colorButton } = useSettings();

    const [showModal, setShowModal] = useState(false);


    useEffect(() => {
    }, [colorButton]);

    const Styled = {
        btn: {
            color: getMonoColor(getNameColorARGB(colorButton)),
            background: colorButton
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
                <button style={Styled.btn} onClick={() => {
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
