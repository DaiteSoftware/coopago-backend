import {
  DB_DATABASE,
  DB_PASSWORD,
  DB_SERVER,
  DB_USER,
  DB_PORT,
} from "../config.js";
import sql from "mssql";

export const dbSettings = {
  server: DB_SERVER,
  port: parseInt(DB_PORT),
  database: DB_DATABASE,
  user: DB_USER,
  password: DB_PASSWORD,
  options: {
    encrypt: true,
    trustServerCertificate: true,
  },
};

export const getConnection = async () => {
  try {
    const pool = sql.connect(dbSettings);
    console.log("Conexión exitosa a la base de datos");
    return pool;
  } catch (error) {
     throw new Error("Error al conectarse a la base de datos:", error);
  }
};

export { sql };
