import { Router } from 'express'
import { login } from '../controllers/login.controller.js'
import { verifyUser } from '../middlewares/verifyDb.js'

const router = Router()

router.post('/login', verifyUser, login)

export default router
