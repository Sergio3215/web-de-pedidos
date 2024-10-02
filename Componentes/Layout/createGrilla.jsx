"use client"

import { useEffect, useState } from "react";
import { useSettings } from "../../Context/Settings/settingsContext";
const { getMonoColor, getNameColorARGB } = require('adaptive-color');

export default function CreateGrilla({ fields, setShowModal, action }) {

    const { colorButton } = useSettings();


    const [width, setWidth] = useState(window.innerWidth);
    const [height, setHeight] = useState(window.innerHeight);

    const [myImg, setMyImg] = useState('');


    const closeModal = () => {
        setShowModal(false);
    }

    const handlerSubmit = async (e) => {
        e.preventDefault();
    }

    useEffect(() => {

    }, [myImg])

    return (
        <>
            <div className="bk--black" onClick={closeModal} style={{
                width: "100%",
                height: "100%",
            }}></div>
            <form id="form--grilla" onSubmit={handlerSubmit}>
                <div id="close--popup" onClick={closeModal}>X</div>
                {
                    fields.map((dt, index) => {
                        return (
                            <>
                                {
                                    dt == "Fecha Creación" ?
                                        <>
                                        </>
                                        :
                                        <>
                                            {
                                                dt == "Destacados" || dt == "Estado" ?
                                                    <>
                                                        <div id="form--checkbox" key={index}>
                                                            <div>
                                                                <label>{dt}</label>
                                                            </div>
                                                            <div>
                                                                <input type="checkbox"
                                                                    name={dt}
                                                                    required={dt != "Destacados"}
                                                                />
                                                            </div>
                                                        </div>
                                                        {
                                                            dt == "Destacados" ?
                                                                <>
                                                                    <div key={index}>
                                                                        <div>
                                                                            <label>{"Foto"}</label>
                                                                        </div>
                                                                        {
                                                                            myImg == '' ?
                                                                                <>
                                                                                </>
                                                                                :
                                                                                <div>
                                                                                    <img
                                                                                        alt="img product"
                                                                                        src={myImg}
                                                                                        width={50}
                                                                                        height={50}
                                                                                    />
                                                                                </div>
                                                                        }
                                                                        <div>
                                                                            <input id="grid--file" type="file" name={"file"}
                                                                                style={{
                                                                                    display: "none"
                                                                                }}
                                                                                required
                                                                                onChange={(e) => {
                                                                                    try {
                                                                                        const link = URL.createObjectURL(e.target.files[0])
                                                                                        setMyImg(link);
                                                                                    } catch (error) {
                                                                                        setMyImg('');
                                                                                    }
                                                                                }}
                                                                            />
                                                                            <button onClick={() => {
                                                                                document.querySelector("#grid--file").click();
                                                                            }}
                                                                                style={{
                                                                                    background: colorButton,
                                                                                    color: getMonoColor(getNameColorARGB(colorButton))
                                                                                }}>
                                                                                Subir Foto
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                </>
                                                                :
                                                                <>
                                                                </>
                                                        }
                                                    </>
                                                    :
                                                    <div key={index}>
                                                        <div>
                                                            <label>{dt}</label>
                                                        </div>
                                                        <div>
                                                            <input type={dt == "Precio" ? "number" : "text"} name={dt} required />
                                                        </div>
                                                    </div>
                                            }
                                        </>
                                }
                            </>
                        )
                    })
                }
                <div>
                    <input
                        style={{
                            background: colorButton,
                            color: getMonoColor(getNameColorARGB(colorButton))
                        }}
                        type="submit"
                        value="Guardar"
                    />
                </div>
            </form>
        </>
    )
}