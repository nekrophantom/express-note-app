import { Router } from "express";
import notesRoute from './notes.route.js'
import authRoute from './auth.route.js'
import { authenticate } from "../middleware/auth.middleware.js";

const router = Router()

router.use('/auth', authRoute)

router.use(authenticate)
router.use('/notes', notesRoute)

export default router