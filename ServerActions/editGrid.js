"use server"
import { ProductQuery } from '../db/query';
const _productQuery = new ProductQuery();

export async function updateGrid(formData){
    const file = formData.get("myFile");
    const name = formData.get("Nombre");
    const id = formData.get("id");
    if(file !== undefined && file !== null){
        // console.log(file.size);
        const price = formData.get("Precio");
        const public_id = formData.get("public_id");
        const highlights = formData.get("Destacados");
        let destacar = false;
        let filePublic = file;

        if(highlights !== null){
            destacar = true;
        }
        if(file.size == 0 && file.name == 'undefined'){
            filePublic = public_id;
        }
        await _productQuery.UpdateProduct(id, name, parseInt(price), destacar, filePublic);
    }
    // console.log(formData);
}