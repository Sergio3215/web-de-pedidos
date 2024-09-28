import { SettingsProvider } from "../../Context/Settings/settingsProvider"
import Header from "../../Componentes/Layout/header";
import Background from "../../Componentes/Layout/background";
import Contacts from "../../Componentes/Contacts/contacts";

export default function Page() {
    return (
        <>
            <SettingsProvider>
                <Background>
                    <Header />
                    <Contacts />
                </Background>
            </SettingsProvider>
        </>
    )
}