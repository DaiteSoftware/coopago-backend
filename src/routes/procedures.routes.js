import { Router } from 'express'
import { getStoredProcedures, getProcedureParams, executeStoredProcedure } from '../controllers/procedures.controller.js'
import { isAuthenticated } from '../middlewares/auth.js'
// import { verifyUser } from '../middlewares/verifyDb.js'

const router = Router()

router.get('/getStoredProcedures', isAuthenticated, getStoredProcedures)
router.get('/getProcedureParams/:procedureName', isAuthenticated, getProcedureParams)
router.post('/ejecutar', executeStoredProcedure)

export default router
