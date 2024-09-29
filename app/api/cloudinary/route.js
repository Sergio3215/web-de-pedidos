// require('dotenv').config();

const cloudinary = require("cloudinary").v2;

const cloudinaryConfig = cloudinary.config({
    cloud_name: process.env.cloud_name,
    api_key: process.env.api_key,
    api_secret: process.env.api_secret,
    secure: true
});

export function GET(req, res) {
    try {
        return Response.json({ cloudinaryConfig: cloudinaryConfig, cld: cloudinary });
    } catch (err) {
        // console.log(err)
        return Response.json({ data: [], error: err.message, success: false });
    }
}

export async function POST(req, res) {
    const url = new URL(req.url) 
    const public_id = url.searchParams.get("public_id");

    try {
        await cloudinary.api.delete_resources(public_id);
        return Response.json({ success:true});
    } catch (error) {
        return Response.json({ success:false});
    }
}