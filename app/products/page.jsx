import { SettingsProvider } from "../../Context/Settings/settingsProvider"
import Header from "../../Componentes/Layout/header";
import Products from "../../Componentes/Products/products";
import Background from "../../Componentes/Layout/background";
import ProductProvider from "../../Context/Products/productProvider";

export default function Page() {
    return (
        <>
            <ProductProvider>
                <SettingsProvider>
                    <Background>
                        <Header />
                        <Products />
                    </Background>
                </SettingsProvider>
            </ProductProvider>
        </>
    )
}