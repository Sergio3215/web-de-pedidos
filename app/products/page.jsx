import { SettingsProvider } from "../../Context/Settings/settingsProvider"
import Header from "../../Componentes/Layout/header";
import Products from "../../Componentes/Products/products";
import Background from "../../Componentes/Layout/background";

export default function Page() {
    return (
        <>
            <SettingsProvider>
                <Background>
                    <Header />
                    <Products/>
                </Background>
            </SettingsProvider>
        </>
    )
}