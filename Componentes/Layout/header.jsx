"use client"
import Image from 'next/image'
import cutecat from '../../public/img example/cutecat.jpg'
import panaLogo from '../../public/img example/panaderia logo.png'
import { useSettings } from '../../Context/Settings/settingsContext'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
const { getMonoColor, getNameColorARGB } = require('adaptive-color');
import { Cloudinary } from "@cloudinary/url-gen";

export default function Header() {

    const { colorHead, imgId } = useSettings();

    const router = useRouter();


    const cld = new Cloudinary({
        cloud: {
            cloudName: "dkart8ohp",
        },
    });

    const [urlIdLogo, setUrlIdLogo] = useState("");
    const [arrOptions, setArrOptions] = useState([
        {
            url: '',
            name: "Inicio"
        },
        {
            url: 'products',
            name: "Productos"
        },
        {
            url: 'contacts',
            name: "Contactos"
        },
        {
            url: 'settings',
            name: "Configuración"
        },
        {
            url: 'login',
            name: "Iniciar Sesión"
        },
        {
            url: 'signin',
            name: "Registrarse"
        },
    ]);

    const getColor = async () => {
        const data = cld
            .image(imgId);

        const image = data.toURL();
        if (image != '') {
            const response = await fetch(image);
            const blob = await response.blob();
            const urlNew = URL.createObjectURL(blob);
            setUrlIdLogo(urlNew);
        }
        else {
            const response = await fetch(panaLogo.src);
            const blob = await response.blob();
            setUrlIdLogo(URL.createObjectURL(blob));
            panaLogo.src = URL.createObjectURL(blob);
            setUrlIdLogo(panaLogo.src)
            // debugger
        }
    }

    useEffect(() => {
        getColor();
    }, []);

    useEffect(() => {
        // console.log(urlIdLogo)
    }, [urlIdLogo]);

    
    useEffect(() => {
        getColor();
    }, [imgId]);

    const redirectURL = (href) => {
        router.push(`/${href}`);
    }

    return (
        <div id="header" style={{
            background: colorHead,
        }}>
            <div id="logo--image">
                <Image
                    width={90}
                    height={90}
                    src={urlIdLogo}
                    alt='logo of page'
                />
            </div>
            <div id="options--menu">
                <nav>
                    <ul>
                        {
                            arrOptions.map((m, index) => {
                                return (
                                    <li onClick={() => redirectURL(m.url)}
                                        style={{
                                            color: getMonoColor(getNameColorARGB(colorHead))
                                        }} key={index}>
                                        {m.name}
                                    </li>
                                )
                            })
                        }
                    </ul>
                </nav>
            </div>
        </div>
    )
}