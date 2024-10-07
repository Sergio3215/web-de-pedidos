import { ProductQuery } from '../../../db/query';

const cloudinary = require("cloudinary").v2;

const cloudinaryConfig = cloudinary.config({
    cloud_name: process.env.cloud_name,
    api_key: process.env.api_key,
    api_secret: process.env.api_secret,
    secure: true
});

const _productQuery = new ProductQuery();

export async function GET() {
    const data = await _productQuery.GetProduct();
    return Response.json({ data });
}

export async function POST(req) {
    // const url = new URL(req.url);
    // const name = url.searchParams.get("name");
    // const img_id = url.searchParams.get("img_id");
    // const price = url.searchParams.get("price");
    // const hightlight = url.searchParams.get("hightlight");
    const body = await req.json();

    let name, price, hightlight, img_id;

    body.map(dt => {
        if (dt.name == "Nombre") {
            name = dt.value;
        }
        if (dt.name == "Precio") {
            price = dt.value;
        }
        if (dt.name == "Destacados") {
            hightlight = dt.value;
        }
        if (dt.name == "img_id") {
            img_id = dt.value;
        }
    })
    const data = await _productQuery.CreateProduct(name, parseInt(price), hightlight, img_id);
    return Response.json({ success: true });
}

export async function PUT() {
    const data = await _productQuery.UpdateProduct();
    return Response.json({ data });
}

export async function DELETE(req) {
    const url = new URL(req.url);
    const id = url.searchParams.get("id");

    const product = await _productQuery.GetProductById(id);

    // console.log(product[0].image_id);
    try {
        await cloudinary.api.delete_resources([product[0].image_id]);
        const data = await _productQuery.DeleteProduct(id);
        console.log(data);
        return Response.json({ success: true });
    } catch (error) {
        console.log(error);
        return Response.json({ success: false });
    }
}