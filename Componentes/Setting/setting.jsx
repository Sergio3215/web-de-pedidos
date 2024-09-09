"use client"
import { useContext, useEffect, useState } from "react"

import { useSettings } from "../../Context/settingsContext"
import Body from "../Layout/body";
import Background from "../Layout/background";

export default function Settings() {

    const [colorHeader, setColorHeader] = useState("#0000");
    const [colorBody, setColorBody] = useState("#0000");
    const [colorBackground, setColorBackground] = useState("#0000");
    const [id, setId] = useState("");

    const { createDB, getDB, saveDB } = useSettings();

    const getMySettings = async (user) => {
        let mySetting = await getDB(user);
        if (mySetting.result.length != 0) {
            setId(mySetting.result[0].id);
            setColorHeader(mySetting.result[0].colorHeader);
            setColorBody(mySetting.result[0].colorBody);
            setColorBackground(mySetting.result[0].colorBackground);
        }
    }

    const mySaveSettings = async (user) => {
        if (id == "") {
            const mySetting = await createDB(colorHeader, colorBody, colorBackground, user);
            setId(mySetting.result.id);
        }
        else {
            saveDB(colorHeader, colorBody, colorBackground, user, id);
        }
    }

    useEffect(() => {
        getMySettings('test');
    }, [])

    return (
        <Background>
            <Body>
                <h1>Configuracion de la pagina</h1>
                <div id="form--settings">
                    <div>
                        <label>Color del Header</label>
                        <input type="color" value={colorHeader} onChange={(e) => setColorHeader(e.target.value)} />
                    </div>
                    <div>
                        <label>Color del Body</label>
                        <input type="color" value={colorBody} onChange={(e) => setColorBody(e.target.value)} />
                    </div>
                    <div>
                        <label>Color del Background</label>
                        <input type="color" value={colorBackground} onChange={(e) => setColorBackground(e.target.value)} />
                    </div>
                    <div>
                        <button onClick={() => mySaveSettings('test')}>Guardar</button>
                    </div>
                </div>
            </Body>
        </Background>
    )

}