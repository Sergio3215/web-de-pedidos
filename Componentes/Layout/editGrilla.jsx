
'use client'

import { useSettings } from "../../Context/Settings/settingsContext";
import {useEffect, useState} from 'react';
import { updateGrid } from '../../ServerActions/editGrid'
const { getMonoColor, getNameColorARGB } = require('adaptive-color');
import Swal from 'sweetalert2';


export default function EditForm({ fields, success, update, setEditShowModal, setEditUpdate, editUpdate, labelEdit, setEditName }) {

    const { colorButton } = useSettings();

    const [imgFile, setImgFile] = useState('');
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [highlights, setHighlights] = useState(false);


    useEffect(()=>{
        if(labelEdit == "Producto"){
            setName(editUpdate.name);
            setPrice(editUpdate.price);
            setHighlights(editUpdate.highlights);
        }
    }, [])

    const closeModal = () => {
        Swal.fire({
            position: "center",
            icon: "success",
            title: "Se ha actualizado el registro correctamente",
            showConfirmButton: false,
            timer: 1500
        });
        setTimeout(() => {
            update();
        }, 2000);
        setEditShowModal(false);
        setEditUpdate('');
        setEditName('');
    }

    return (
        <>
            <div className="bk--black" onClick={closeModal} style={{
                width: "100%",
                height: "100%",
            }}></div>
            <form id="form--grilla" action={(formData)=>{
                updateGrid(formData);
                closeModal();
            }} method="PUT" >
                <div id="close--popup" onClick={closeModal}>X</div>
                <div><input name="id" readonly type="hidden" value={editUpdate.id} /></div>
                {
                    labelEdit == "Producto" ?
                        <>
                            <div>
                                <div>
                                    <label>{"Nombre"}</label>
                                </div>
                                <div>
                                    <input type="text"
                                        name={"Nombre"}
                                        required
                                        value={name}
                                        onChange={(e) => {
                                            setName(e.target.value);
                                        }}
                                    />
                                </div>
                            </div>
                            <div>
                                <div>
                                    <label>{"Precio"}</label>
                                </div>
                                <div>
                                    <input type="number"
                                        name={"Precio"}
                                        required
                                        value={price}
                                        onChange={(e) => {
                                            setPrice(e.target.value);
                                        }}
                                    />
                                </div>
                            </div>
                            <div id="form--checkbox">
                                <div>
                                    <label>{"Destacados"}</label>
                                </div>
                                <div>
                                    <input type="checkbox"
                                        name={"Destacados"}
                                        checked={highlights}
                                        onChange={(e) => {
                                            setHighlights(e.target.checked);
                                        }}
                                    />
                                    <input type="hidden" name="public_id" value={editUpdate.image_id} />
                                </div>
                            </div>
                            <div>
                                <input id="grid--file" type="file" name="myFile"
                                    style={{
                                        display: "none"
                                    }}
                                    onChange={(e) => {
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
                        </>
                        :
                        <></>
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