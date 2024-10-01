"use client"
import { useEffect, useState } from "react";
import { useSettings } from "../../Context/Settings/settingsContext";
const { getMonoColor, getNameColorARGB } = require('adaptive-color');

export default function Body({ children }) {

    const { bodyColor } = useSettings();

    const [padding, setPadding] = useState('0');

    useEffect(() => {
        setPadding(getPadding())
    }, []);

    useEffect(()=> {
        
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
                background: bodyColor,
                color: (bodyColor != "") ? getMonoColor(getNameColorARGB(bodyColor)) : '',
                padding: padding,
                textAlign:"center"
            }}>
                {children}
            </div>
        </div>
    );
}