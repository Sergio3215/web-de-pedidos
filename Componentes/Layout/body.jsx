"use client"
import { useEffect, useState } from "react";
import { useSettings } from "../../Context/Settings/settingsContext";
const { getMonoColor, getNameColorARGB } = require('adaptive-color');

export default function Body({ children }) {

    const { bodyColor } = useSettings();

    const [backgroundColor, setBackgroundColor] = useState("");
    const [padding, setPadding] = useState('0');

    const getColor = async () => {
        setBackgroundColor(bodyColor);
    }

    useEffect(() => {
        getColor();
        setPadding(getPadding())
    }, []);

    useEffect(()=> {
        setBackgroundColor(bodyColor);
    }, [bodyColor])

    const getPadding = ()=>{
        try {
            return (location.href.includes('settings')) ?
                        "1% 5%"
                        :
                        "1% 25%"
        } catch (error) {
            return "0"
        }
    }

    return (
        <div id="body">
            <div style={{
                background: backgroundColor,
                color: (backgroundColor != "") ? getMonoColor(getNameColorARGB(backgroundColor)) : '',
                padding: padding,
                textAlign:"center"
            }}>
                {children}
            </div>
        </div>
    );
}