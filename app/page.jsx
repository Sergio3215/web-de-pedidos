import Container from "../Componentes/Container/container";
import { SettingsProvider } from "../Context/Settings/settingsProvider";
import Header from "../Componentes/Layout/header";
import Home from "../Componentes/Home/home";
import Background from "../Componentes/Layout/background";

export default function Page() {
    return (
        <>
            <SettingsProvider>
                <Background>
                    <div>
                        <Header />
                        <Home />
                    </div>
                </Background>
            </SettingsProvider>
        </>
    )
}