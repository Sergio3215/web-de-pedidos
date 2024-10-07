"use client"

import { useEffect, useState } from 'react';
import { useSettings } from '../../Context/Settings/settingsContext';
import CreateGrilla from './createGrilla';
import DeleteIco from './deleteIco';
import EditForm from './editGrilla';
import EditIco from './editIco';

const { getMonoColor, getNameColorARGB } = require('adaptive-color');

export default function Grilla({ header, grillaBody, label, action, deleteClick, updateClick, success, update, intention }) {

    const { colorButton } = useSettings();

    const [showModal, setShowModal] = useState(false);
    const [editShowModal, setEditShowModal] = useState(false);
    const [editUpdate, setEditUpdate] = useState('');
    const [editName, setEditName] = useState('');


    useEffect(() => {
        // console.log(grillaBody);
    }, [])

    useEffect(() => {
        // console.log(grillaBody)
    }, [colorButton, grillaBody]);

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
                    <CreateGrilla fields={header} setShowModal={setShowModal} action={action} success={success} update={update} />
                    :
                    <></>
            }

            {
                editShowModal ?
                    <EditForm fields={header} setEditShowModal={setEditShowModal} success={success} update={update} setEditUpdate={setEditUpdate} editUpdate={editUpdate} labelEdit={editName} setEditName={setEditName}/>
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
                            <div id="grilla--empty">No hay productos disponibles</div>
                            :
                            grillaBody.map((bd, index) => {
                                return (
                                    <div>
                                        <div key={index}>
                                            {bd.name}
                                            <div>
                                                <span id="edit--item" onClick={() => {
                                                    // updateClick(bd.id);
                                                    setEditShowModal(true);
                                                    setEditUpdate(bd);
                                                    setEditName(intention)
                                                }}>
                                                    <EditIco setEditShowModal={setEditShowModal} fields={header} action={action} update={update} />
                                                </span>
                                                <span id="delete--item" onClick={() => {
                                                    deleteClick(bd.id);
                                                }}>
                                                    <DeleteIco />
                                                </span>
                                            </div>
                                        </div>
                                        <div key={index}>{bd.price}</div>
                                        <div key={index}>{bd.highlights ? "Si" : "No"}</div>
                                    </div>
                                )
                            })
                    }
                </div>
            </div>
        </>
    )
}
