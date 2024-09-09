import { SettingsQuery } from "../../../db/query";

const settingQuery = new SettingsQuery();

export async function GET(req){
    const url = new URL(req.url);
    const user = url.searchParams.get("user");
    const data = await settingQuery.GetSettings(user);
    return Response.json({result:data});
}

export async function POST(req){
    const body = await req.json();
    const {colorHeader, colorBody, colorBackground, user} = body;
    const data = await settingQuery.CreateSettings(colorHeader, colorBody, colorBackground, user);
    return Response.json({result:data});
}


export async function PUT(req){
    const body = await req.json();
    const {colorHeader, colorBody, colorBackground, user, id} = body;
    const data = await settingQuery.UpdateSettings(colorHeader, colorBody, colorBackground, user, id);
    return Response.json({result:data});
}