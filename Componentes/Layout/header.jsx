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

    const { getDB } = useSettings();

    const router = useRouter();


    const cld = new Cloudinary({
        cloud: {
            cloudName: "dkart8ohp",
        },
    });


    const [headerColor, setHeaderColor] = useState("");
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
    ]);

    const getColor = async () => {
        let color = await getDB("test");
        const { colorHeader, logo_id } = color.result[0];

        setHeaderColor(colorHeader);


        const data = cld
            .image(logo_id);

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
            console.log(panaLogo.src)
            // debugger
        }
    }

    useEffect(() => {
        getColor();
    }, []);

    useEffect(() => {
        console.log(urlIdLogo)
    }, [urlIdLogo]);

    const redirectURL = (href) => {
        router.push(`/${href}`);
    }

    return (
        <div id="header" style={{
            background: headerColor,
        }}>
            <div id="logo--image">
                <Image
                    width={120}
                    height={120}
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
                                            color: getMonoColor(getNameColorARGB(headerColor))
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