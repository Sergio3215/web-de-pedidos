//login account server action next js 
"use server"
import { AccountQuery } from '../db/query';
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken"
import { cookies } from 'next/headers';
const _accountQuery = new AccountQuery();

const signJWT = (data)=>{
   return jwt.sign(data, process.env.word_secret, {expiresIn: '4h'});
}

export async function loginAccount(formData) {
    try {
        const email = formData.get("email");
        const password = formData.get("password");
        const user = await _accountQuery.GetUserByEmail(email);

        if (user.length > 0) {
            const isValid = await bcrypt.compare(password, user[0].password);
            if (isValid) {
                const token = signJWT({
                    id: user[0].id,
                    email: user[0].email,
                    rol: user[0].rol,
                    user: user[0].user
                });
                cookies().set("token", token);
                return '';
            }
            else {
                throw new Error("Contraseña incorrecta");
            }
        }
        else {
            throw new Error("El usuario no existe");
        }
    } catch (error) {
        console.log(error);
        return error.message;
        // throw error;
    }
}
//login account server action next js