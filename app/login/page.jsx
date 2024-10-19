'use client'
import LoginComponent from "../../Componentes/login/login";
import { SettingsProvider } from "../../Context/Settings/settingsProvider";

export default function Login() {
    return (
        <>
            <SettingsProvider>
                <LoginComponent />
            </SettingsProvider>
        </>
    )
}