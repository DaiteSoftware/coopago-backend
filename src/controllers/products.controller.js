import { getConnection, sql } from "../database/connection.js";

export const getProducts = async (req, res) => {
  try {
    console.log("GET request to the homepage");
  } catch (error) {
    throw new Error("Error al obtener los productos:", error);
  }
};

export { sql };
