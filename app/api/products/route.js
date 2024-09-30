
import { ProductQuery } from '../../../db/query';

const _productQuery = new ProductQuery();

export async function GET(){
    const data = await _productQuery.GetProduct();
    return Response.json({data});
}

export async function POST(req){
    const url = new URL(req.url);
    const name = url.searchParams.get("name");
    const img_id = url.searchParams.get("img_id");
    const price = url.searchParams.get("price");
    const hightlight = url.searchParams.get("hightlight");
    const data = await _productQuery.CreateProduct(name, price, hightlight, img_id);
    return Response.json({data});
}

export async function PUT(){
    const data = await _productQuery.UpdateProduct();
    return Response.json({data});
}

export async function DELETE(){
    const data = await _productQuery.DeleteProduct();
    return Response.json({data});
}