import sql from 'mssql'

export const connectToDatabase = async (dbConfig) => {
  try {
    await sql.close() // Cierra cualquier conexión previa
    return await sql.connect(dbConfig) // Retorna una nueva conexión
  } catch (error) {
    console.error('Error connecting to database:', error)
    throw error // Propaga el error para manejarlo más arriba
  }
}
