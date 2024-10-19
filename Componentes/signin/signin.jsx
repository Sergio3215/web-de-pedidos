'use client'
import Background from "../../Componentes/Layout/background";
import Body from "../../Componentes/Layout/body";
import { useSettings } from "../../Context/Settings/settingsContext"
import { useEffect } from "react";
const { getMonoColor, getNameColorARGB } = require('adaptive-color');



export default function SignInComponent() {

    const { colorBack, colorButton } = useSettings();

    useEffect(() => {

    }, [colorBack, colorButton])


    return (
        <>
            <Background>
                <Body back={colorBack}>
                    <h1 style={{
                        fontSize:"50px"
                    }}>Registrarse</h1>
                    <form action="" method="post" id="form-account">
                        <div>
                            <label>Nombre</label>
                            <input type="text" name="name" required />
                        </div>
                        <div>
                            <label>Apellido</label>
                            <input type="text" name="lastname" required />
                        </div>
                        <div>
                            <label>Usuario</label>
                            <input type="text" name="user" required />
                        </div>
                        <div>
                            <label>Email</label>
                            <input type="email" name="email" required />
                        </div>
                        <div>
                            <label>Contraseña</label>
                            <input type="password" name="password" required />
                        </div>
                        <div>
                            <br />
                            <br />
                            <input type="submit" value="Registrarse" style={{
                                background: colorButton,
                                color: getMonoColor(getNameColorARGB(colorButton))
                            }} />
                            <br />
                        </div>
                    </form>
                    <br />
                    <hr />
                    <br />
                    <br />
                    <a href="/login">
                        <button style={{
                            background: colorButton,
                            color: getMonoColor(getNameColorARGB(colorButton))
                        }}>
                            Iniciar Sesión
                        </button>
                    </a>
                </Body>
            </Background>
        </>
    )
}