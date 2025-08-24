import { createNote, findAllNotes, findNoteById, removeNote, updateNote } from "../services/notes.service.js";

export const getNotes = async (req, res, next) => {
    try {
        const userId = req.user.userId
        const notes = await findAllNotes(userId);

        res.status(200).json({
            message: 'success',
            data: notes
        })

    } catch (error) {
        res.status(500).json({ message: 'Failed to get notes', error: error.message });
    }
}

export const getNoteById = async (req, res, next) => {
    const id = parseInt(req.params.id)
    try {
        const userId = req.user.userId
        const note = await findNoteById(id, userId)

        if (!note) {
            return res.status(400).json({ message: 'Note not found' })
        }

        res.status(200).json({
            message: 'success',
            data: note
        })

    } catch (error) {
        res.status(500).json({ message: 'Failed to get note', error: error.message });
    }
}

export const addNote = async (req, res, next) => {
    try {
        const { title, description, dueDate } = req.body

        if (!title || !description || !dueDate) {
            return res.status(400).json({ message: 'Please enter the fields' })
        }

        const userId = req.user.userId
        const note = await createNote({ userId, title, description, dueDate })

        res.status(200).json({
            message: 'success',
            data: note
        })

    } catch (error) {
        res.status(500).json({ message: 'Failed to get note', error: error.message });
    }
}

export const editNote = async (req, res, next) => {
    try {
        const id = parseInt(req.params.id)

        const note = await findNoteById(id)

        if (!note) {
            return res.status(400).json({ message: 'Note not found' })
        }

        const { title, description, dueDate, isPinned } = req.body

        if (title == undefined && description == undefined && dueDate == undefined && isPinned == undefined) {
            return res.status(400).json({ message: 'Title is required' })
        }

        const userId = req.user.userId
        const updatedNote = await updateNote({ id, title, description, dueDate, isPinned, userId })

        res.status(200).json({
            message: 'success',
            data: updatedNote
        })

    } catch (error) {
        res.status(500).json({ message: 'Failed to get note', error: error.message });
    }
}

export const deleteNote = async (req, res, next) => {
    const id = parseInt(req.params.id)
    try {
        const note = await findNoteById(id)

        if (!note) {
            return res.status(400).json({ message: 'Note not found' })
        }

        const userId = req.user.userId
        await removeNote(id, userId)

        res.status(200).json({
            message: 'Notes deleted successfully'
        })

    } catch (error) {
        res.status(500).json({ message: 'Failed to get note', error: error.message });
    }
}
