import Swal from "sweetalert2";
import { useRol } from "../../Context/Rol/rolContext";
import Grilla from "../Layout/grilla";
import { useEffect } from "react";


export default function GrillaRoles(){

    const {rol, getRol} = useRol();
    
    const updateClick = async (id, body) => {
        // console.log(id);
        // await fetch(`/api/products?id=${id}`, {
        //     method: 'PUT',
        //     body: JSON.stringify(body)
        // });
    }

    const deleteClick = async (id) => {
        // console.log(id);
        const swalWithBootstrapButtons = Swal.mixin({
            buttonsStyling: true
        });
        swalWithBootstrapButtons.fire({
            title: "Advertencia!",
            text: "¿Quieres borrar este rol?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Si",
            cancelButtonText: "No",
            reverseButtons: false,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#5cb85c",
        }).then(async (result) => {
            if (result.isConfirmed) {
                await fetch(`/api/rol?id=${id}`, {
                    method: 'DELETE',
                });
                getRol();
                swalWithBootstrapButtons.fire({
                    title: "Borrado!",
                    text: "El rol se ha borrado exitosamente",
                    icon: "success",
                    confirmButtonColor: "#5cb85c",
                });
            } else if (
                /* Read more about handling dismissals below */
                result.dismiss === Swal.DismissReason.cancel
            ) {
                swalWithBootstrapButtons.fire({
                    title: "Cancelado",
                    text: "Tu rol no se ha borrado",
                    icon: "error",
                    confirmButtonColor: "#d33",
                });
            }
        });
    }

    useEffect(() => {
        // console.log(rol)
    }, [rol])

    console.log(rol)
    return (
        <>
            <Grilla header={["Nombre", "Permisos"]} grillaBody={rol}  label="Rol" action={"api/rol"} success={"El rol se ha guardado correctamente"}  intention={"Rol"} update={getRol} deleteClick={deleteClick}/>
        </>
    )
}