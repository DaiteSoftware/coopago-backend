import sql from 'mssql'

export const connectToDatabase = async (dbConfig) => {
  try {
    await sql.close()
    return await sql.connect(dbConfig)
  } catch (error) {
    console.error('Error connecting to database:', error)
    throw error
  }
}
