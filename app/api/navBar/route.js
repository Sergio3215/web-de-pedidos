import { AccountQuery } from '../../../db/query';
import jwt from "jsonwebtoken"
const _accountQuery = new AccountQuery();

export async function GET(req) {
    try {
        const token = req.cookies.get('token').value;
        console.log(token)

        if(token == undefined){
            throw new Error("No se ha encontrado el token");
        }

        const payload = jwt.verify(token, process.env.word_secret);
        const { email } = payload;
        const user = await _accountQuery.GetUserByEmail(email);

        let nav = [
                {
                    url: '',
                    name: "Inicio"
                },
                {
                    url: 'products',
                    name: "Productos"
                },
                {
                    url: 'contacts',
                    name: "Contactos"
                },
                {
                    url: 'settings',
                    name: "Configuración"
                },
                {
                    url: '/api/logout',
                    name: "Desconectarse"
                }
            ];

        if (user[0].rol == "3") {
            nav = [
                {
                    url: '',
                    name: "Inicio"
                },
                {
                    url: 'products',
                    name: "Productos"
                },
                {
                    url: 'contacts',
                    name: "Contactos"
                },
                {
                    url: 'settings',
                    name: "Configuración"
                },
                {
                    url: '/api/logout',
                    name: "Desconectarse"
                }
            ]
        }


        return Response.json({ nav});

    } catch (error) {
        console.log(error);

        let nav = [
            {
                url: '',
                name: "Inicio"
            },
            {
                url: 'products',
                name: "Productos"
            },
            {
                url: 'contacts',
                name: "Contactos"
            },
            {
                url: 'login',
                name: "Iniciar Sesión"
            },
            {
                url: 'signin',
                name: "Registrarse"
            },
        ]
        
        return Response.json({ nav});
        // throw error;
    }
}