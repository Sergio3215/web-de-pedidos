import Container from "../Componentes/Container/container";
import { SettingsProvider } from "../Context/Settings/settingsProvider";
import Header from "../Componentes/Layout/header";
import Home from "../Componentes/Home/home";
import Background from "../Componentes/Layout/background";
import ProductProvider from "../Context/Products/productProvider";

export default function Page() {
    return (
        <>
            <ProductProvider>
                <SettingsProvider>
                    <Background>
                        <div>
                            <Header />
                            <Home />
                        </div>
                    </Background>
                </SettingsProvider>
            </ProductProvider>
        </>
    )
}