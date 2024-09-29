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

module.exports = {
    SettingsQuery
};