import Settings from "../../Componentes/Setting/setting";
import { SettingsProvider } from "../../Context/Settings/settingsProvider"
import { CloudinaryProvider } from "../../Context/Cloudinary/cloudinaryProvider"

export default function settingPage() {
    return (
        <SettingsProvider>
            <CloudinaryProvider>
                <Settings />
            </CloudinaryProvider>
        </SettingsProvider>
    )
}