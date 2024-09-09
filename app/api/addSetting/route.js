import { SettingsQuery } from "../../../db/query";

const settingQuery = new SettingsQuery();

export async function Post(req){
    const url = new URL(req.url);
    const user = url.searchParams.get("user");
    const data = await settingQuery.GetSettings(user);
    return Response.json({result:data});
}