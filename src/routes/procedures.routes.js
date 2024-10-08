import { Router } from 'express'
import { getStoredProcedures, getProcedureParams } from '../controllers/procedures.controller.js'
import { isAuthenticated } from '../middlewares/auth.js'

const router = Router()

router.get('/getStoredProcedures', isAuthenticated, getStoredProcedures)
router.get('/getProcedureParams/:procedureName', getProcedureParams)

export default router
