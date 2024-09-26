import { getConnection, sql } from '../database/connection.js';

export const login = async (req, res) => {
  const { usuario, contrasena } = req.body;

 
  if (!usuario || !contrasena) {
    return res.status(400).json({ error: "Todos los campos son obligatorios" });
  }

  try {
    const pool = await getConnection();

    // Ejecutar el procedimiento almacenado
    const result = await pool
      .request()
      .input('usuario', sql.VarChar(100), usuario)
      .input('contrasena', sql.VarChar(30), contrasena)
      .execute('p_traer_conexion_usuario_autenticar');

    const user = result.recordset[0];
    

    if (user && user.error) {
      return res.status(400).json({ error: user.mensaje });
    }

    if (!user) {
      return res.status(401).json({ error: "Usuario o contraseña incorrectos" });
    }

    return res.status(200).json({ message: "Inicio de sesión exitoso", data: user });
  } catch (error) {
    console.error('Error al ejecutar el procedimiento almacenado:', error);

    return res.status(500).json({ error: "Error en el servidor" });
  }
};
