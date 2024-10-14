import { getConnection, sql } from '../database/connection.js'

export const verifyUser = async (req, res, next) => {
  const { usuario, contrasena } = req.body

  try {
    const pool = await getConnection()
    const result = await pool.request()
      .input('usuario', sql.VarChar(100), usuario)
      .input('contrasena', sql.VarChar(30), contrasena)
      .execute('p_traer_conexion_usuario_autenticar')

    const connectionInfo = result.recordset[0]

    if (!connectionInfo) {
      return res.status(404).json({
        error: 'No se encontraron datos de conexión para el usuario.'
      })
    }

    req.dbConfig = {
      user: connectionInfo.usuario,
      password: connectionInfo.contrasena,
      server: connectionInfo.hospedaje,
      port: parseInt(connectionInfo.puerto),
      database: connectionInfo.base_datos,
      options: {
        encrypt: true,
        trustServerCertificate: true
      }
    }

    next()
  } catch (error) {
    return res.status(500).json({
      error: 'Error al obtener la configuración de la base de datos.'
    })
  }
}
