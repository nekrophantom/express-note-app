import { PrismaClient } from "../generated/prisma"

const prisma = new PrismaClient()

export const findAllUsers = async () => {
    return await prisma.user.findMany()
}

export const findUserById = async (id) => {
    return await prisma.user.findUnique({
        where: {
            id: id
        }
    })
}

export const findUserBy = async (where) => {
    return await prisma.user.findUnique({
       where
    })
}