import { Router } from 'express'
import { login, logout } from '../controllers/login.controller.js'
import { verifyUser } from '../middlewares/verifyDb.js'

const router = Router()

router.post('/login', verifyUser, login)
router.post('/logout', logout)

export default router
