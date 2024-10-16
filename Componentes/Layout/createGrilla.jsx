"use client"

import { useEffect, useState } from "react";
import { useSettings } from "../../Context/Settings/settingsContext";
import { useCloudinary } from "../../Context/Cloudinary/cloudinaryContext";
import Swal from "sweetalert2";
const { getMonoColor, getNameColorARGB } = require('adaptive-color');

export default function CreateGrilla({ fields, setShowModal, action, success, update }) {

    const { colorButton } = useSettings();
    const { getCloudinary } = useCloudinary();

    const [width, setWidth] = useState(window.innerWidth);
    const [height, setHeight] = useState(window.innerHeight);

    const [myImg, setMyImg] = useState('');


    const closeModal = () => {
        setShowModal(false);
    }

    const handlerSubmit = async (e) => {
        e.preventDefault();

        try {

            if (action == undefined) {
                throw new Error("No se ha añadido un action");
            }
            let file = false;
            fields.map(dt => {
                if (myImg == '' && dt == "Destacados") {
                    return;
                }
                if (dt == "Destacados") {
                    file = true;
                }
            })

            let data = [];


            // console.log(fields)

            fields.map((field, index) => {
                if (field == "Estado" || field == "Destacados") {
                    data.push({
                        name: field,
                        value: e.target[index].checked
                    })
                }
                else {
                    data.push({
                        name: field,
                        value: e.target[index].value
                    })
                }
            });

            if (file) {
                const cloud = await getCloudinary();
                const { cloud_name } = cloud.cloudinaryConfig;
                const timestamp = `${Math.round(new Date().getTime() / 1000)}`;

                const formData = new FormData();
                formData.append('upload_preset', 'Gallery');
                formData.append('file', document.querySelector("#grid--file").files[0]);
                formData.append("cloud_name", cloud_name);
                formData.append("timestamp", timestamp);

                const res = await fetch('https://api.cloudinary.com/v1_1/' + cloud_name + '/image/upload', {
                    method: 'POST',
                    body: formData
                });
                const response = await res.json();

                data.push({
                    name: "img_id",
                    value: response.public_id
                });
            }
            const ftch = await fetch(action, {
                method: "POST",
                body: JSON.stringify(data)
            });

            Swal.fire({
                position: "center",
                icon: "success",
                title: success,
                showConfirmButton: false,
                timer: 1500
            });
            if (update !== undefined) {
                update();
            }
            closeModal();
        } catch (err) {
            console.log(err)
            Swal.fire({
                position: "center",
                icon: "error",
                title: "Se ha producido un error",
                showConfirmButton: false,
                timer: 1500
            });
        }
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
                                    dt == "Permisos" ?
                                        <>
                                            <div id="form--permisos" key={index}>
                                                <div>
                                                    <label>{dt}</label>
                                                </div>
                                                <div>
                                                    <select id="form--permisos--select" require>
                                                        <option value="0">Seleccionar Rol</option>
                                                        <option value="1">Total</option>
                                                        <option value="2">Parcial</option>
                                                        <option value="3">Ninguna</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </>
                                        :
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
                                                                                <input id="grid--file" type="file" name="myFile"
                                                                                    style={{
                                                                                        display: "none"
                                                                                    }}
                                                                                    onChange={(e) => {
                                                                                        try {
                                                                                            const link = URL.createObjectURL(e.target.files[0])
                                                                                            setMyImg(link);
                                                                                        } catch (error) {
                                                                                            setMyImg('');
                                                                                        }
                                                                                    }}
                                                                                />
                                                                                <span id="btn--update--file" onClick={() => {
                                                                                    document.querySelector("#grid--file").click();
                                                                                }}
                                                                                    style={{
                                                                                        background: colorButton,
                                                                                        color: getMonoColor(getNameColorARGB(colorButton))
                                                                                    }}>
                                                                                    Subir Foto
                                                                                </span>
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