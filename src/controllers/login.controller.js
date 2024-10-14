import sql from 'mssql'

export const login = async (req, res) => {
  const { usuario, contrasena } = req.body

  const dbConfig = req.dbConfig

  try {
    const pool = await sql.connect(dbConfig)

    const result = await pool.request()
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

    req.session.auth = {
      user: dbConfig.user,
      password: dbConfig.password,
      server: dbConfig.server,
      port: parseInt(dbConfig.port),
      database: dbConfig.database,
      options: dbConfig.options
    }

    return res.status(200).json({
      message: `Conexión y login exitoso bienvenido ${userData.usuario}`,
      data: {
        id_usuario: userData.id_usuario,
        usuario: userData.usuario
      },
      database: dbConfig
    })
  } catch (error) {
    return res.status(500).json({
      error: 'Error en el servidor o en la conexión a la base de datos'
    })
  }
}

export const logout = async (req, res) => {
  await sql.close()
  if (req.session.auth) {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ error: 'Error al cerrar sesión' })
      }
      res.clearCookie('connect.sid')
      return res.status(200).json({ message: 'Sesión cerrada exitosamente' })
    })
  } else {
    return res.status(401).json({ error: 'No hay sesión activa para cerrar' })
  }
}
