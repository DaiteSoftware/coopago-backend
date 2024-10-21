import sql from "mssql";
import jwt from "jsonwebtoken";
import { cManager } from "../database/connections.mjs";
import { JWT_SECRET, REFRESH_JWT_SECRET } from "../config.js";

export const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const pool = await cManager.pools.bridge;
    const result = await pool
      .request()
      .input("usuario", username)
      .input("contrasena", password)
      .execute("p_traer_conexion_usuario_autenticar");
    const connectionInfo = result.recordset[0];
    if (connectionInfo.error) {
      return res.status(404).json({
        error: connectionInfo.mensaje,
      });
    }
    const dbConfig = {
      user: connectionInfo.usuario,
      password: connectionInfo.contrasena,
      server: connectionInfo.hospedaje,
      port: parseInt(connectionInfo.puerto),
      database: connectionInfo.base_datos,
      options: {
        encrypt: true,
        trustServerCertificate: true,
      },
    };
    await cManager.connectToDB(dbConfig.database, dbConfig);
    const accessToken = jwt.sign(
      {
        username: username,
        database: connectionInfo.base_datos,
      },
      JWT_SECRET,
      { expiresIn: "5m" }
    );
    // const refreshToken = jwt.sign(
    //   {
    //     username: username,
    //     databaseName: connectionInfo.base_datos,
    //   },
    //   REFRESH_JWT_SECRET,
    //   {expiresIn: '2h'}
    // );
    return res.status(200).json({
      message: "Login success",
      user: username,
      accessToken: accessToken,
    });
  } catch (err) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const logout = async (req, res) => {
  await sql.close();
  if (req.session.auth) {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ error: "Error al cerrar sesión" });
      }
      res.clearCookie("connect.sid");
      return res.status(200).json({ message: "Sesión cerrada exitosamente" });
    });
  } else {
    return res.status(401).json({ error: "No hay sesión activa para cerrar" });
  }
};
