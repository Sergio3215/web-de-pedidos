import Settings from "../../Componentes/Setting/setting";
import { SettingsProvider } from "../../Context/Settings/settingsProvider"
import { CloudinaryProvider } from "../../Context/Cloudinary/cloudinaryProvider"
import ProductProvider from "../../Context/Products/productProvider";
import RolProvider from "../../Context/Rol/rolProvider";

export default function settingPage() {
    return (
        <RolProvider>
            <ProductProvider>
                <SettingsProvider>
                    <CloudinaryProvider>
                        <Settings />
                    </CloudinaryProvider>
                </SettingsProvider>
            </ProductProvider>
        </RolProvider>
    )
}