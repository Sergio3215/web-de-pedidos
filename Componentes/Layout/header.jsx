"use client"
import Image from 'next/image'
import cutecat from '../../public/img example/cutecat.jpg'
import panaLogo from '../../public/img example/panaderia logo.png'
import { useSettings } from '../../Context/settingsContext'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
const { getMonoColor, getNameColorARGB } = require('adaptive-color');

export default function Header() {

    const { getDB } = useSettings();

    const router = useRouter();


    const [headerColor, setHeaderColor] = useState("");
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
        setHeaderColor(color.result[0].colorHeader);
    }

    useEffect(() => {
        getColor();
    }, []);

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
                    src={panaLogo.src}
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