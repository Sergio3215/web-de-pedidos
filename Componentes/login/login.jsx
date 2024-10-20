import { getMonoColor, getNameColorARGB } from "adaptive-color";
import { useSettings } from "../../Context/Settings/settingsContext";
import Background from "../Layout/background";
import Body from "../Layout/body";
import { useEffect, useState } from "react";
import { loginAccount } from "../../ServerActions/loginAccount";



export default function LoginComponent() {

    const { colorBack, colorButton } = useSettings();

    const [errorMsg, setErrorMsg] = useState('');

    useEffect(() => {

    }, [colorBack, colorButton])

    const handlerForm = async (formData) => {
        const msj = await loginAccount(formData);
        msj == '' ?
            setTimeout(() => {
                window.location.href = "/";
            }, 1000)
            :
            setErrorMsg(msj);
    }

    return (
        <>
            <Background>
                <Body back={colorBack}>
                    <h1 style={{
                        fontSize: "50px"
                    }}>Iniciar Sesión</h1>
                    <form action={(formData) => {
                        handlerForm(formData);
                    }} method="get" id="form-account">
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
                            <div style={{
                                color: "red"
                            }}>
                                {errorMsg}
                            </div>
                            <br />
                            <input type="submit" value="Iniciar Sesion" style={{
                                background: colorButton,
                                color: getMonoColor(getNameColorARGB(colorButton))
                            }} />
                        </div>
                    </form>
                    <br />
                    <hr />
                    <br />
                    <br />
                    <a href="/signin">
                        <button style={{
                            background: colorButton,
                            color: getMonoColor(getNameColorARGB(colorButton))
                        }}>
                            Registrarse
                        </button>
                    </a>
                </Body>
            </Background>
        </>
    )
}