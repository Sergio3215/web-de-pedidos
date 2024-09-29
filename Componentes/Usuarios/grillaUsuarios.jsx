import Grilla from "../Layout/grilla";

export default function GrillaUsuarios(){

    return (
        <>
            <Grilla header={["Nombre", "Rol", "Fecha Creación", "Email", "Estado"]} grillaBody={[]}  label="Usuario"/>
        </>
    )
}