"use client"
import { useContext, useEffect, useState } from "react"

import { useSettings } from "../../Context/Settings/settingsContext"
import Body from "../Layout/body";
import Background from "../Layout/background";
import { useCloudinary } from "../../Context/Cloudinary/cloudinaryContext";
import panaLogo from '../../public/img example/panaderia logo.png'
import Image from "next/image";
import { Cloudinary } from "@cloudinary/url-gen";
const crypto = require('crypto');

export default function Settings() {

    const [colorHeader, setColorHeader] = useState("#0000");
    const [colorBody, setColorBody] = useState("#0000");
    const [colorBackground, setColorBackground] = useState("#0000");
    const [id, setId] = useState("");
    const [configCloudinary, setConfigCloudinary] = useState({});
    const [selectedFile, setSelectedFile] = useState(null);
    const [urlImageLogo, setUrlImageLogo] = useState("");
    const [logoPublicId, setLogoPublicId] = useState('')

    const { createDB, getDB, saveDB } = useSettings();
    const { getCloudinary } = useCloudinary();

    const cld = new Cloudinary({
        cloud: {
            cloudName: "dkart8ohp",
        },
    });

    const getMySettings = async (user) => {
        let mySetting = await getDB(user);
        if (mySetting.result.length != 0) {
            setId(mySetting.result[0].id);
            setColorHeader(mySetting.result[0].colorHeader);
            setColorBody(mySetting.result[0].colorBody);
            setColorBackground(mySetting.result[0].colorBackground);
            setLogoPublicId(mySetting.result[0].logo_id);

            const data = cld
                .image(mySetting.result[0].logo_id);
            // console.log(data.toURL())
            const image = data.toURL();
            setUrlImageLogo(image);
        }
    }

    const mySaveSettings = async (user) => {
        if (!selectedFile) {
            if (id == "") {
                const mySetting = await createDB(colorHeader, colorBody, colorBackground, user);
                setId(mySetting.result.id);
            }
            else {
                saveDB(colorHeader, colorBody, colorBackground, user, id);
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
            const { cld } = configCloudinary;
            const timestamp = `${Math.round(new Date().getTime() / 1000)}`;

            const ftch = await fetch(`${location.origin}/api/cloudinary?public_id=${logoPublicId}`,{
                method: 'POST',
            });
            const res = await ftch.json();

            const formData = new FormData();
            formData.append('upload_preset', 'pedido-web');
            formData.append('file', selectedFile[0]);
            formData.append("cloud_name", cloud_name);
            formData.append("timestamp", timestamp);

            const data = await fetch('https://api.cloudinary.com/v1_1/' + cloud_name + '/image/upload', {
                method: 'POST',
                body: formData
            }).then(r => r.json());
            console.log(data)
            // debugger
            // setUrlImageLogo(data.url);

            saveDB(colorHeader, colorBody, colorBackground, user, id, data.public_id);
        }
    }

    const getCloudi = async () => {
        setConfigCloudinary(await getCloudinary());
    }

    const setImage = (value) => {
        const link = URL.createObjectURL(value)
        setUrlImageLogo(link);
    }

    useEffect(() => {
        getMySettings('test');
        getCloudi();
    }, [])

    return (
        <>
            <Background>
                <div id="title">
                    <label>Configuracion de la pagina</label>
                </div>
                <Body>
                    <h1>Perfil</h1>
                    <div id="form--settings">
                        <div>
                            <label>Imagen de Perfil</label>
                        </div>
                        <div>
                            <img
                                width={120}
                                height={120}
                                src={urlImageLogo == "" ? panaLogo.src : urlImageLogo}
                                alt='logo of page'
                            />
                        </div>
                        <div>
                            <input type="file" name="profile" onChange={(e) => {
                                setSelectedFile(e.target.files);
                                setImage(e.target.files[0]);
                            }
                            } />
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
                            <input type="color" value={colorBody} onChange={(e) => setColorBody(e.target.value)} />
                        </div>
                        <div>
                            <label>Color del Background</label>
                            <input type="color" value={colorBackground} onChange={(e) => setColorBackground(e.target.value)} />
                        </div>
                    </div>
                </Body>
                <div id="form--footer">
                    <button onClick={() => mySaveSettings('test')}>Guardar</button>
                </div>
            </Background>
        </>
    )

}