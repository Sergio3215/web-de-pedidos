"use client"
import { useContext, useEffect, useState } from "react"

import { useSettings } from "../../Context/Settings/settingsContext"
import Body from "../Layout/body";
import Background from "../Layout/background";
import { useCloudinary } from "../../Context/Cloudinary/cloudinaryContext";
import panaLogo from '../../public/img example/panaderia logo.png'
import Image from "next/image";
import { Cloudinary } from "@cloudinary/url-gen";
import { color } from "@cloudinary/url-gen/qualifiers/background";
import GrillaProductos from "../Products/grillaProductos";
import GrillaRoles from "../Roles/grillaRoles";
import GrillaUsuarios from "../Usuarios/grillaUsuarios";
import Loader from "../Layout/loader";
const crypto = require('crypto');

const { getMonoColor, getNameColorARGB } = require('adaptive-color');

export default function Settings() {

    const [colorHeader, setColorHeader] = useState("#0000");
    const [colorBody, setColorBody] = useState("#0000");
    const [colorBackground, setColorBackground] = useState("#0000");
    const [colorButton, setColorButton] = useState("#0000");
    const [id, setId] = useState("");
    const [configCloudinary, setConfigCloudinary] = useState({});
    const [selectedFile, setSelectedFile] = useState(null);
    const [urlImageLogo, setUrlImageLogo] = useState("");
    const [logoPublicId, setLogoPublicId] = useState('');
    const [load, setLoad] = useState(false);

    const { createDB, getDB, saveDB, updateEnviroment } = useSettings();
    const { getCloudinary } = useCloudinary();

    const cld = new Cloudinary({
        cloud: {
            cloudName: "dkart8ohp",
        },
    });

    const Styled = {
        btn: {
            color: getMonoColor(getNameColorARGB(colorButton)),
            background: colorButton
        }
    }

    const getMySettings = async (user) => {
        let mySetting = await getDB(user);
        if (mySetting.result.length != 0) {
            setId(mySetting.result[0].id);
            setColorHeader(mySetting.result[0].colorHeader);
            setColorBody(mySetting.result[0].colorBody);
            setColorBackground(mySetting.result[0].colorBackground);
            setLogoPublicId(mySetting.result[0].logo_id);
            setColorButton(mySetting.result[0].colorButton);

            const data = cld
                .image(mySetting.result[0].logo_id);
            // console.log(data.toURL())

            const image = data.toURL();
            if (image != "") {
                const response = await fetch(image);
                const blob = await response.blob();
                const urlNew = URL.createObjectURL(blob);
                setUrlImageLogo(urlNew);
            }
        }
    }

    const mySaveSettings = async (user) => {
        if (!selectedFile) {
            if (id == "") {
                const mySetting = await createDB(colorHeader, colorBody, colorBackground, colorButton, "", user);
                setId(mySetting.result.id);
            }
            else {
                saveDB(colorHeader, colorBody, colorBackground, colorButton, logoPublicId, user, id);
                // location.reload(true);
            }
        }
        else {

            //upload preset configurar desde clloudinary en configuracion
            /**
             * Para llamarlo
             * https://res.cloudinary.com/dkart8ohp/image/upload/v1726980519/pedido-web/ + public_id
             */

            const { cloud_name, api_key, api_secret } = configCloudinary.cloudinaryConfig;
            const timestamp = `${Math.round(new Date().getTime() / 1000)}`;

            if (logoPublicId !== "") {
                const ftch = await fetch(`${location.origin}/api/cloudinary?public_id=${logoPublicId}`, {
                    method: 'POST',
                });
                const res = await ftch.json();
            }

            const formData = new FormData();
            formData.append('upload_preset', 'pedido-web');
            formData.append('file', selectedFile[0]);
            formData.append("cloud_name", cloud_name);
            formData.append("timestamp", timestamp);

            const res = await fetch('https://api.cloudinary.com/v1_1/' + cloud_name + '/image/upload', {
                method: 'POST',
                body: formData
            });
            const data = await res.json();
            // console.log(data)

            let urlNew = data.url;

            try {
                const response = await fetch(data.url);
                const blob = await response.blob();
                urlNew = URL.createObjectURL(blob);
            } catch (error) {

            }
            
            setUrlImageLogo(urlNew);

            setLogoPublicId(data.public_id);
            setSelectedFile(null);


            if (id == "") {
                const mySetting = await createDB(colorHeader, colorBody, colorBackground, colorButton, data.public_id, user);
                setId(mySetting.result.id);
            }
            else {
                await saveDB(colorHeader, colorBody, colorBackground, colorButton, data.public_id, user, id);
                // location.reload(true);
            }
        }
        setLoad(false);
    }

    const getCloudi = async () => {
        setConfigCloudinary(await getCloudinary());
    }

    const setImage = (value) => {
        try {
            const link = URL.createObjectURL(value)
            setUrlImageLogo(link);
        } catch (error) {

        }
    }

    const UrlImageLogo = async () => {
        const response = await fetch(panaLogo.src);
        const blob = await response.blob();
        panaLogo.src = URL.createObjectURL(blob);
    }

    useEffect(() => {
        getMySettings('test');
        getCloudi();
        UrlImageLogo();

    }, []);

    useEffect(() => {
    }, [load]);

    return (
        <>
            {
                load ?
                    <>
                        <Loader />
                    </>
                    :
                    <Background>
                        <div id="title">
                            <label style={{
                                color: getMonoColor(getNameColorARGB(colorBackground))
                            }}>Configuracion de la pagina</label>
                        </div>
                        <Body>
                            <h1>Perfil</h1>
                            <div id="form--settings">
                                <div>
                                    <label>Imagen de Perfil</label>
                                </div>
                                <div className="pic--logo">
                                    <img
                                        width={120}
                                        height={120}
                                        src={urlImageLogo == "" ? panaLogo.src : urlImageLogo}
                                        alt='logo of page'
                                    />
                                </div>
                                <div id="container--logo--file">
                                    <input type="file" name="profile" className="logo---file" onChange={(e) => {
                                        setSelectedFile(e.target.files);
                                        setImage(e.target.files[0]);
                                    }
                                    } />
                                    <button onClick={() => {
                                        let btn = document.querySelector('.logo---file');
                                        btn.click();
                                    }} style={Styled.btn}>Subir Archivo</button>
                                </div>
                            </div>
                        </Body>
                        <Body>
                            <h1>Colores</h1>
                            <div id="form--settings">
                                <div>
                                    <label>Color del Header</label>
                                    <input type="color" value={colorHeader} onChange={(e) => setColorHeader(e.target.value)} />
                                </div>
                                <div>
                                    <label>Color del Body</label>
                                    <input type="color" value={colorBody} onChange={(e) => {
                                        setColorBody(e.target.value);
                                        updateEnviroment(e.target.value, "body");
                                    }} />
                                </div>
                                <div>
                                    <label>Color del Background</label>
                                    <input type="color" value={colorBackground} onChange={(e) => {
                                        setColorBackground(e.target.value);
                                        updateEnviroment(e.target.value, "background");
                                    }} />
                                </div>
                                <div>
                                    <label>Color del Button</label>
                                    <input type="color" value={colorButton} onChange={(e) => {
                                        setColorButton(e.target.value);
                                        updateEnviroment(e.target.value, "button");
                                    }} />
                                </div>
                            </div>
                        </Body>

                        <Body>
                            <h1>Productos</h1>
                            <div id="form--settings">
                                <div>
                                    <GrillaProductos />
                                </div>
                            </div>
                        </Body>
                        <Body>
                            <h1>Roles</h1>
                            <div id="form--settings">
                                <div>
                                    <GrillaRoles />
                                </div>
                            </div>
                        </Body>
                        <Body>
                            <h1>Usuarios</h1>
                            <div id="form--settings">
                                <div>
                                    <GrillaUsuarios />
                                </div>
                            </div>
                        </Body>
                        <div id="form--footer">
                            <button onClick={async () => {
                                setLoad(true);
                                mySaveSettings('test');
                            }} style={Styled.btn}>Guardar</button>
                        </div>
                    </Background>
            }
        </>
    )

}