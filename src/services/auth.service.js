import { PrismaClient } from "../generated/prisma";

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