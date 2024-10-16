const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

class SettingsQuery {
    constructor() {

    }

    async CreateSettings(colorHeader, colorBody, colorBackground, colorButton, logo_id, user) {
        return await prisma.settings.create({
            data: {
                colorHeader: colorHeader,
                colorBody: colorBody,
                colorBackground: colorBackground,
                colorButton: colorButton,
                user: user,
                logo_id: logo_id,
            }
        })
    }


    async UpdateSettings(colorHeader, colorBody, colorBackground, colorButton, logo_id, user, id) {
        // console.log(logo_id)
        return await prisma.settings.update({
            where: {
                id: id
            },
            data: {
                colorHeader: colorHeader,
                colorBody: colorBody,
                colorBackground: colorBackground,
                colorButton: colorButton,
                user: user,
                logo_id: logo_id,
            }
        });
    }

    async GetSettings(user) {
        return await prisma.settings.findMany({
            where: {
                user: user
            }
        });
    }

}

class ProductQuery {
    constructor() {
    }

    async GetProduct() {
        return await prisma.products.findMany();
    }

    async GetProductById(id) {
        return await prisma.products.findMany({
            where: {
                id: id
            }
        })
    }

    async CreateProduct(name, price, hightlight, img_id) {
        return await prisma.products.create({
            data: {
                name: name,
                price: price,
                highlights: hightlight,
                image_id: img_id
            }
        })
    }

    async UpdateProduct(id, name, price, hightlight, img_id) {
        return await prisma.products.update({
            where: {
                id: id
            },
            data: {
                name: name,
                price: price,
                highlights: hightlight,
                image_id: img_id
            }
        })
    }

    async DeleteProduct(id) {
        return await prisma.products.delete({
            where: {
                id: id
            }
        })
    }
}

class RolQuery{
    constructor(){

    }

    async GetRol(){
        return await prisma.rol.findMany();
    }
    
    async CreateRol(name, rol) {
        return await prisma.rol.create({
            data: {
                name: name,
                rol: rol
            }
        })
    }

    async UpdateRol(id, name, rol) {
        return await prisma.rol.update({
            where: {
                id: id
            },
            data: {
                name: name,
                rol: rol
            }
        })
    }

    async DeleteRol(id) {
        return await prisma.rol.delete({
            where: {
                id: id
            }
        })
    }
}

module.exports = {
    SettingsQuery,
    ProductQuery,
    RolQuery
};