import sql from 'mssql'
import { connectToDatabase } from '../database/reconection.js'

export const getStoredProcedures = async (req, res) => {
  const dbConfig = req.session.auth

  try {
    if (!dbConfig) {
      return res.status(400).json({ error: 'Configuración de conexión no disponible.' })
    }

    const pool = await connectToDatabase(dbConfig)
    const result = await pool.request().query(`
      SELECT SPECIFIC_NAME AS procedureName
      FROM INFORMATION_SCHEMA.ROUTINES
      WHERE ROUTINE_TYPE = 'PROCEDURE'
    `)

    res.json(result.recordset)
  } catch (err) {
    console.error('Error fetching stored procedures:', err)
    res.status(500).json({ error: 'Error fetching stored procedures', details: err.message })
  }
}

export const getProcedureParams = async (req, res) => {
  console.log('Sesión actual:', req.session)

  if (!req.session.auth) {
    return res.status(401).json({ error: 'Usuario no autenticado' })
  }
  const { procedureName } = req.params
  const dbConfig = req.session.auth

  try {
    const pool = await connectToDatabase(dbConfig)
    const result = await pool.request()
      .input('procedureName', sql.VarChar, procedureName)
      .query(`
        SELECT DISTINCT PARAMETER_NAME, DATA_TYPE 
        FROM INFORMATION_SCHEMA.PARAMETERS 
        WHERE SPECIFIC_NAME = @procedureName
      `)

    if (result.recordset.length === 0) {
      return res.status(404).json({ error: 'No parameters found for this procedure' })
    }
    res.status(200).json(result.recordset)
  } catch (err) {
    console.error('Error fetching procedure parameters:', err)
    res.status(500).json('Error fetching procedure parameters')
  }
}

export const executeStoredProcedure = async (req, res) => {
  const { procedureName } = req.body
  const params = req.body.params
  const dbConfig = req.session.auth

  if (!dbConfig) {
    return res.status(400).json({ error: 'Configuración de conexión no disponible.' })
  }

  try {
    const pool = await connectToDatabase(dbConfig)
    const request = pool.request()

    const uniqueParams = new Set(Object.keys(params))
    if (uniqueParams.size < Object.keys(params).length) {
      console.warn('Parámetros duplicados detectados en el objeto params.')
    }

    for (const [key, value] of Object.entries(params)) {
      request.input(key, value)
    }

    const result = await request.execute(procedureName)
    await sql.close()
    res.status(200).json(result.recordset)
  } catch (err) {
    console.error('Error executing stored procedure:', err)
    res.status(500).json({ error: 'Error executing stored procedure', details: err.message })
  }
}
