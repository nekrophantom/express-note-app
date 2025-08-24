import { PrismaClient } from "../generated/prisma/index.js";

const prisma = new PrismaClient()

export const createNewUser = async (data) => {
    return await prisma.user.create({
        data: {
            name: data.name,
            email: data.email,
            password: data.password
        }
    })
}