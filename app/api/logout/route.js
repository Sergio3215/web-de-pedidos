
import { cookies } from 'next/headers';
const jwt = require('jsonwebtoken');

export async function GET (req) {

    try {
        cookies().delete("token");

    } catch (error) {
        console.log(error)
        return Response.json({
            status:false
        });
    }
    
    return Response.json({
        status:true
    });
}