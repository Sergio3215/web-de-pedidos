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
    const [arrOptions, setArrOptions] = useState([]);

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

    const getNav = async () => {
        const ftch = await fetch('/api/navBar');
        const data = await ftch.json();
        setArrOptions(data.nav);
    }

    useEffect(() => {
        getColor();
        getNav();
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

    const logout = async (url)=>{
        const ft = await fetch(url);
        const res = await ft.json();

        setTimeout(() => {
            window.location.reload(true);
        }, 500)
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
                                    <>
                                        {
                                            m.url == "/api/logout" ?
                                                <li onClick={() => logout(m.url)}
                                                    style={{
                                                        color: getMonoColor(getNameColorARGB(colorHead))
                                                    }} key={index}>
                                                    {m.name}
                                                </li>
                                                :
                                                <li onClick={() => redirectURL(m.url)}
                                                    style={{
                                                        color: getMonoColor(getNameColorARGB(colorHead))
                                                    }} key={index}>
                                                    {m.name}
                                                </li>
                                        }
                                    </>
                                )
                            })
                        }
                    </ul>
                </nav>
            </div>
        </div>
    )
}