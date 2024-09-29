"use client"
import { useEffect, useState } from "react";
import { useSettings } from "../../Context/Settings/settingsContext";

export default function Background({ children }) {

    const { getDB, colorBack } = useSettings();

    const [backgroundColor, setBackgroundColor] = useState("");
    const [height, setHeight] = useState("100%");

    const getColor = async () => {
        let color = await getDB("test");
        setBackgroundColor(color.result.length == 0 ? "#000" : color.result[0].colorBackground);
        document.querySelector("body").style.backgroundColor = color.result.length == 0 ? "#000" : color.result[0].colorBackground;
    }

    useEffect(() => {
        getColor();
        getHeight();
        window.addEventListener("resize", () => getHeight());
    }, []);

    useEffect(()=>{
        setBackgroundColor(colorBack);
        document.querySelector("body").style.backgroundColor = colorBack;
        
    }, [colorBack])

    const getHeight = () => {
        let myHeight = window.innerHeight
        setHeight(myHeight);
    }

    return (
        <div style={{
            background: backgroundColor,
            height: height,
        }}>
            {children}
        </div>
    )
}