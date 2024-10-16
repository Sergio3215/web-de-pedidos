"use client"

import Swal from "sweetalert2";
import { useProduct } from "../../Context/Products/productContext";
import Grilla from "../Layout/grilla"
import { useEffect } from "react";



export default function GrillaProductos() {

    const { product, getProduct } = useProduct();

    useEffect(() => {

    }, [product])

    const deleteClick = async (id) => {
        console.log(id);
        const swalWithBootstrapButtons = Swal.mixin({
            buttonsStyling: true
        });
        swalWithBootstrapButtons.fire({
            title: "Advertencia!",
            text: "¿Quieres borrar este producto?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Si",
            cancelButtonText: "No",
            reverseButtons: false,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#5cb85c",
        }).then(async (result) => {
            if (result.isConfirmed) {
                await fetch(`/api/products?id=${id}`, {
                    method: 'DELETE',
                });
                getProduct();
                swalWithBootstrapButtons.fire({
                    title: "Borrado!",
                    text: "El producto se ha borrado exitosamente",
                    icon: "success",
                    confirmButtonColor: "#5cb85c",
                });
            } else if (
                /* Read more about handling dismissals below */
                result.dismiss === Swal.DismissReason.cancel
            ) {
                swalWithBootstrapButtons.fire({
                    title: "Cancelado",
                    text: "Tu producto no se ha borrado",
                    icon: "error",
                    confirmButtonColor: "#d33",
                });
            }
        });
    }


    const updateClick = async (id, body) => {
        // console.log(id);
        await fetch(`/api/products?id=${id}`, {
            method: 'PUT',
            body: JSON.stringify(body)
        });
    }


    return (
        <>
            <Grilla header={["Nombre", "Precio", "Destacados"]} grillaBody={product} label="Producto" action="api/products" deleteClick={deleteClick} updateClick={updateClick} success={"El produto se ha guardado correctamente"} update={getProduct} intention={"Producto"} />
        </>
    )
}