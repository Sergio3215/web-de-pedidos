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
        console.log(logo_id)
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

    async CreateProduct(name, price, hightlight, img_id) {
        return await prisma.products.create({
            data: {
                name: name,
                price: price,
                hightlight: hightlight,
                img_id: img_id
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
                hightlight: hightlight,
                img_id: img_id
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

module.exports = {
    SettingsQuery,
    ProductQuery
};