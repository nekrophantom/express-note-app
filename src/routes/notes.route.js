import { Router } from "express";
import { addNote, deleteNote, editNote, getNoteById, getNotes } from "../controllers/notes.controller.js";

const router = Router()

router.get('/', getNotes)
router.get('/:id', getNoteById)
router.post('/', addNote)
router.put('/:id', editNote)
router.delete('/:id', deleteNote)

export default router