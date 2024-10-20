"use server"
const { AccountQuery } = require('../db/query');
import bcrypt from 'bcrypt';

const _accountQuery = new AccountQuery();


export async function createAccount(formData) {
    try {
        let password = formData.get("password");
        password = await bcrypt.hash(password, 10);
        const name = formData.get("name");
        const lastname = formData.get("lastname");
        const newEmail = formData.get("email");
        const user = formData.get("user");

        const email = await _accountQuery.GetUserByEmail(newEmail);
        const usersArr = await _accountQuery.GetUsers();
        console.log(email);
        let rol = '1';
        if(usersArr.length > 0) {
            rol = "3"
        }

        if (email.length == 0) {
            await _accountQuery.CreateRol(name, lastname, newEmail, password, rol, user);
        }
        else{
            throw new Error("El usuario ya existe");
        }
    } catch (error) {
        console.log(error);
    }
}