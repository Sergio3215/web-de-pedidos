'use client'

import { SettingsProvider } from "../../Context/Settings/settingsProvider";
import SignInComponent from "../../Componentes/signin/signin";


export default function SignIn() {

    return (
        <>
            <SettingsProvider>
                <SignInComponent />
            </SettingsProvider>
        </>
    )
}