import sql from 'mssql'

export const login = async (req, res) => {
  const { usuario } = req.body

  // Obtener la configuración de la base de datos del middleware
  const dbConfig = req.dbConfig

  try {
    // Conectarse dinámicamente a la base de datos del usuario
    const pool = await sql.connect(dbConfig)

    // Realizar una consulta para obtener información del usuario
    const result = await pool
      .request()
      .input('usuario', sql.VarChar(100), usuario)
      .query('SELECT * FROM usuarios WHERE usuario = @usuario')

    const userData = result.recordset[0]

    if (!userData) {
      return res
        .status(404)
        .json({ error: 'Usuario no encontrado en la base de datos' })
    }
    req.session.usuario = {
      user: dbConfig.user,
      password: dbConfig.password,
      server: dbConfig.host,
      port: parseInt(dbConfig.port),
      database: dbConfig.database
    } // Guardar el usuario en la sesión

    // Enviar respuesta con los datos del usuario
    return res.status(200).json({
      message: 'Conexión y login exitoso',
      data: userData,
      database: dbConfig.database
    })
  } catch (error) {
    console.error('Error al conectarse a la base de datos del usuario:', error)
    return res.status(500).json({
      error: 'Error en el servidor o en la conexión a la base de datos'
    })
  }
}
