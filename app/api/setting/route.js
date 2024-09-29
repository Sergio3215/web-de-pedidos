import { SettingsQuery } from "../../../db/query";

const settingQuery = new SettingsQuery();

export async function GET(req) {
    const url = new URL(req.url);
    const user = url.searchParams.get("user");
    const data = await settingQuery.GetSettings(user);
    // console.log(data);
    return Response.json({ result: data });
}

export async function POST(req) {
    const body = await req.json();
    const { colorHeader, colorBody, colorBackground, colorButton, logo_id, user } = body;
    const data = await settingQuery.CreateSettings(colorHeader, colorBody, colorBackground, colorButton, logo_id, user);
    return Response.json({ result: data });
}


export async function PUT(req) {
    let data = [];
    try {
        const body = await req.json();
        const { colorHeader, colorBody, colorBackground, colorButton, user, id, logo_id } = body;
        data = await settingQuery.UpdateSettings(colorHeader, colorBody, colorBackground, colorButton, user, id, logo_id);
    } catch (error) {
        console.log(error)
    }
    return Response.json({ result: data });
}