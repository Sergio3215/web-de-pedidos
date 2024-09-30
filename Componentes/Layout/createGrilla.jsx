"use client"

import { useEffect, useState } from "react";

export default function CreateGrilla({ fields, setShowModal, action }) {

    const [width, setWidth] = useState(window.innerWidth);
    const [height, setHeight] = useState(window.innerHeight);


    const closeModal = () => {
        setShowModal(false);
    }

    return (
        <>
            <div className="bk--black" onClick={closeModal} style={{
                width: "100%",
                height: "100%",
            }}></div>
            <form action={action} method="POST" id="form--grilla">
                <div id="close--popup" onClick={closeModal}>X</div>
                {
                    fields.map((dt, index) => {
                        return (
                            <>
                                {
                                    dt == "Fecha Creación" ?
                                        <></>
                                        :
                                        <div key={index}>
                                            <div>
                                                <label>{dt}</label>
                                            </div>
                                            <div>
                                                <input type="text" name={dt} />
                                            </div>
                                        </div>
                                }
                            </>
                        )
                    })
                }
                <div>
                    <input type="submit" value="Guardar" />
                </div>
            </form>
        </>
    )
}