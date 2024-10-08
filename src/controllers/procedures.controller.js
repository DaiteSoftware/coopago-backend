import sql from 'mssql'

// Obtener todos los procedimientos almacenados de la base de datos
export const getStoredProcedures = async (req, res) => {
  const dbConfig = req.session.usuario

  try {
    await sql.close()

    const pool = await sql.connect(dbConfig)
    const result = await pool.request().query(`
      SELECT SPECIFIC_NAME AS procedureName
      FROM INFORMATION_SCHEMA.ROUTINES
      WHERE ROUTINE_TYPE = 'PROCEDURE'
    `)

    res.json(result.recordset)
  } catch (err) {
    console.error('Error fetching stored procedures:', err)
    res.status(500).send('Error fetching stored procedures')
  }
}

export const getProcedureParams = async (req, res) => {
  const { procedureName } = req.params
  const dbConfig = req.session.usuario

  try {
    await sql.close()

    const pool = await sql.connect(dbConfig)
    const result = await pool.request()
      .input('procedureName', sql.VarChar, procedureName)
      .query(`
        SELECT PARAMETER_NAME, DATA_TYPE 
        FROM INFORMATION_SCHEMA.PARAMETERS 
        WHERE SPECIFIC_NAME = @procedureName
      `)
    res.json(result.recordset)
  } catch (err) {
    console.error('Error fetching procedure parameters:', err)
    res.status(500).send('Error fetching procedure parameters')
  }
}
