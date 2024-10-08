import sql from 'mssql'

export const login = async (req, res) => {
  const { usuario, contrasena } = req.body

  // Obtener la configuración de la base de datos del middleware
  const dbConfig = req.dbConfig

  try {
    // Conectarse dinámicamente a la base de datos del usuario
    const pool = await sql.connect(dbConfig)

    const result = await pool
      .request()
      .input('usuario', sql.VarChar(100), usuario)
      .query('SELECT * FROM usuarios WHERE usuario = @usuario')

    const userData = result.recordset[0]

    if (!userData) {
      return res.status(404).json({ error: 'Usuario no encontrado en la base de datos' })
    }

    const passwordIsValid = userData.contrasena === contrasena

    if (!passwordIsValid) {
      return res.status(401).json({ error: 'Contraseña incorrecta' })
    }

    req.session.usuario = {
      user: dbConfig.user,
      password: dbConfig.password,
      server: dbConfig.server,
      port: parseInt(dbConfig.port),
      database: dbConfig.database,
      options: {
        encrypt: true,
        trustServerCertificate: true
      }
    }

    // Enviar respuesta con los datos del usuario
    return res.status(200).json({
      message: 'Conexión y login exitoso',
      data: userData,
      database: dbConfig
    })
  } catch (error) {
    console.error('Error al conectarse a la base de datos del usuario:', error)
    return res.status(500).json({
      error: 'Error en el servidor o en la conexión a la base de datos'
    })
  }
}

export const logout = (req, res) => {
  if (req.session.usuario) {
    req.session.destroy((err) => {
      if (err) {
        console.error('Error al cerrar sesión:', err)
        return res.status(500).json({ error: 'Error al cerrar sesión' })
      }

      return res.status(200).json({ message: 'Sesión cerrada exitosamente' })
    })
  } else {
    return res.status(204).json({ error: 'No hay sesión activa' })
  }
}
