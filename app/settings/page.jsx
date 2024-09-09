import Settings from "../../Componentes/Setting/setting";
import {SettingsProvider} from "../../Context/settingsProvider"

export default function settingPage(){
    return(
        <SettingsProvider>
            <Settings />
        </SettingsProvider>
    )
}