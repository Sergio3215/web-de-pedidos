"use client"
import { useEffect, useState } from "react";
import { useSettings } from "../../Context/Settings/settingsContext";

export default function Background({ children }) {

    const { getDB } = useSettings();

    const [backgroundColor, setBackgroundColor] = useState("");
    const [height, setHeight] = useState("100%");

    const getColor = async () => {
        let color = await getDB("test");
        setBackgroundColor(color.result[0].colorBackground);
    }

    useEffect(() => {
        getColor();
        getHeight();
        window.addEventListener("resize", () => getHeight());
    }, []);

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