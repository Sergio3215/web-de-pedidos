import Settings from "../../Componentes/Setting/setting";
import { SettingsProvider } from "../../Context/Settings/settingsProvider"
import { CloudinaryProvider } from "../../Context/Cloudinary/cloudinaryProvider"
import ProductProvider from "../../Context/Products/productProvider";

export default function settingPage() {
    return (
        <ProductProvider>
            <SettingsProvider>
                <CloudinaryProvider>
                    <Settings />
                </CloudinaryProvider>
            </SettingsProvider>
        </ProductProvider>
    )
}