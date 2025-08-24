import { PrismaClient } from "../generated/prisma"

const prisma = new PrismaClient()

export const findAllNotes = async (userId) => {
    return await prisma.note.findMany({
        where: {
            userId: userId
        }
    })
}

export const findNoteById = async (id, userId) => {
    return await prisma.note.findUnique({
        where:{
            id: id,
            userId: userId
        }
    })
}

export const createNote = async ({ userId, title, description, dueDate}) => {
    return await prisma.note.create({
        data: {
            title: title,
            description: description,
            dueDate: dueDate,
            userId: userId
        }
    })
}

export const updateNote = async ({ id, title, description, dueDate, isPinned, userId}) => {
    const updateData = {};
    if (title !== undefined) updateData.title = title;
    if (description !== undefined) updateData.description = description;
    if (dueDate !== undefined) updateData.dueDate = new Date(dueDate);
    if (isPinned !== undefined) updateData.isPinned = isPinned;

    const note = await prisma.note.findFirst({
        where: {
            id: id,
            userId: userId
        }
    });

    if (!note) return null;

    return await prisma.note.update({
        where: { 
            id: id,
            userId: userId
        },
        data: updateData
    });
}

export const removeNote = async (id, userId) => {
    return await prisma.note.delete({
        where: {
            id: id,
            userId: userId
        }
    })
}