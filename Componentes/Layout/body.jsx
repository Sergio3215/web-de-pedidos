"use client"
import { useEffect, useState } from "react";
import { useSettings } from "../../Context/settingsContext";
const { getMonoColor, getNameColorARGB } = require('adaptive-color');

export default function Body({ children }) {

    const { getDB } = useSettings();

    const [backgroundColor, setBackgroundColor] = useState("");
    const [padding, setPadding] = useState('0');

    const getColor = async () => {
        let color = await getDB("test");
        setBackgroundColor(color.result[0].colorBody);
    }

    useEffect(() => {
        getColor();
        setPadding(getPadding())
    }, []);

    const getPadding = ()=>{
        try {
            return (location.href.includes('settings')) ?
                        "1% 5%"
                        :
                        "1% 35%"
        } catch (error) {
            return "0"
        }
    }

    return (
        <div id="body">
            <div style={{
                background: backgroundColor,
                color: (backgroundColor != "") ? getMonoColor(getNameColorARGB(backgroundColor)) : '',
                padding: padding
            }}>
                {children}
            </div>
        </div>
    );
}