"use client"
import { useEffect, useState } from "react";
import { useSettings } from "../../Context/Settings/settingsContext";
const { getMonoColor, getNameColorARGB } = require('adaptive-color');

export default function Loader() {

    const { colorBack } = useSettings();

    const [colorBK, setColorBK] = useState(colorBack);

    useEffect(() => {
        setColorBK(colorBack);
    }, [colorBK])

    return (
        <div id="loader--container--general" style={{
            color: getMonoColor(getNameColorARGB(colorBK))
        }}>
            <div id="loader--text--container">
                Cargando
            </div>
            <div id="loader--container">
                <div>.</div>
                <div>.</div>
                <div>.</div>
            </div>
        </div>
    )
}