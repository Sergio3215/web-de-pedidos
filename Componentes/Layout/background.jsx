"use client"
import { useEffect, useState } from "react";
import { useSettings } from "../../Context/Settings/settingsContext";

export default function Background({ children }) {

    const { colorBack } = useSettings();

    const [height, setHeight] = useState("100%");

    const getColor = async () => {
        document.querySelector("body").style.backgroundColor = colorBack;
    }

    useEffect(() => {
        getColor();
        getHeight();
        window.addEventListener("resize", () => getHeight());
    }, []);

    useEffect(()=>{
        document.querySelector("body").style.backgroundColor = colorBack;
        
    }, [colorBack])

    const getHeight = () => {
        let myHeight = window.innerHeight
        setHeight(myHeight);
    }

    return (
        <div style={{
            background: colorBack,
            height: height,
        }}>
            {children}
        </div>
    )
}