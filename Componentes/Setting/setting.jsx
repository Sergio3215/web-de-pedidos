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

    const { createDB, getDB, saveDB, updateEnviroment, bodyColor, colorBack, colorButton, imgId, colorHead, id } = useSettings();
    const { getCloudinary } = useCloudinary();

    const [configCloudinary, setConfigCloudinary] = useState({});
    const [selectedFile, setSelectedFile] = useState(null);
    const [urlImageLogo, setUrlImageLogo] = useState("");
    const [logoPublicId, setLogoPublicId] = useState('');
    const [load, setLoad] = useState(false);
    const [innerWidth, setInnerWidth] = useState(false);

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

    const getMySettings = async () => {
        setLogoPublicId(imgId);

        const data = cld
            .image(imgId);
        // console.log(data.toURL())

        const image = data.toURL();
        if (image != "") {
            const response = await fetch(image);
            const blob = await response.blob();
            const urlNew = URL.createObjectURL(blob);
            setUrlImageLogo(urlNew);
        }
    }

    const mySaveSettings = async (user) => {
        if (!selectedFile) {
            if (id == "") {
                const mySetting = await createDB(colorHead, bodyColor, colorBack, colorButton, "", user);
                updateEnviroment(mySetting.result.id, "id");
            }
            else {
                await saveDB(colorHead, bodyColor, colorBack, colorButton, logoPublicId, user, id);
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
                // const response = await fetch(data.url);
                // const blob = await response.blob();
                // urlNew = URL.createObjectURL(blob);

                const data = cld
                    .image(data.public_id);
                const image = data.toURL();
                if (image != "") {
                    const response = await fetch(image);
                    const blob = await response.blob();
                    urlNew = URL.createObjectURL(blob);
                }
            } catch (error) {

            }

            setUrlImageLogo(urlNew);

            setLogoPublicId(data.public_id);
            setSelectedFile(null);


            if (id == "") {
                const mySetting = await createDB(colorHead, bodyColor, colorBack, colorButton, data.public_id, user);
                updateEnviroment(mySetting.result.id, "id");
            }
            else {
                await saveDB(colorHead, bodyColor, colorBack, colorButton, data.public_id, user, id);
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
        setInnerWidth(window.innerWidth - 17);
        window.addEventListener('resize', () => {
            setInnerWidth(window.innerWidth - 17);
        });
    }, []);

    useEffect(() => {
    }, [load]);

    useEffect(() => {
        getMySettings();
    }, [imgId])

    return (
        <>
            {
                load ?
                    <>
                        <Loader />
                    </>
                    :
                    <Background>
                        <div id="title" style={{
                            background: colorHead,
                            width: innerWidth !== undefined ? innerWidth : "100%"
                        }}>
                            <label style={{
                                color: getMonoColor(getNameColorARGB(colorHead))
                            }}>Configuracion de la pagina</label>
                            <div id="form--footer">
                                <button onClick={async () => {
                                    setLoad(true);
                                    mySaveSettings('test');
                                }} style={Styled.btn}>Guardar</button>
                            </div>
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
                                    <input type="color" value={colorHead} onChange={(e) =>
                                        updateEnviroment(e.target.value, "header")} />
                                </div>
                                <div>
                                    <label>Color del Body</label>
                                    <input type="color" value={bodyColor} onChange={(e) => {
                                        updateEnviroment(e.target.value, "body");
                                    }} />
                                </div>
                                <div>
                                    <label>Color del Background</label>
                                    <input type="color" value={colorBack} onChange={(e) => {
                                        updateEnviroment(e.target.value, "background");
                                    }} />
                                </div>
                                <div>
                                    <label>Color del Button</label>
                                    <input type="color" value={colorButton} onChange={(e) => {
                                        updateEnviroment(e.target.value, "button");
                                    }} />
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
                        <Body>
                            <h1>Roles</h1>
                            <div id="form--settings">
                                <div>
                                    <GrillaRoles />
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
                    </Background>
            }
        </>
    )

}