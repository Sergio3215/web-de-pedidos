import { RolQuery } from '../../../db/query';

const _rolQuery = new RolQuery();

export async function GET() {
    const data = await _rolQuery.GetRol();
    return Response.json({ data });
}

export async function POST(req) {
    const body = await req.json();

    let name, rol;

    body.map(dt => {
        if (dt.name == "Nombre") {
            name = dt.value;
        }
        if (dt.name == "Permisos") {
            rol = dt.value;
        }
    })
    const data = await _rolQuery.CreateRol(name, rol);
    return Response.json({ success: true });
}

export async function DELETE(req) {
    const url = new URL(req.url);
    const id = url.searchParams.get("id");

    try {
        const data = await _rolQuery.DeleteRol(id);
        return Response.json({ success: true });
    } catch (error) {
        console.log(error);
        return Response.json({ success: false });
    }
}