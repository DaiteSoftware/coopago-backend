import { config } from 'dotenv'
config()

export const DB_PORT = parseInt(process.env.DB_PORT)
export const PORT = process.env.PORT
export const DB_USER = process.env.DB_USER
export const DB_PWD = process.env.DB_PWD
export const DB_SERVER = process.env.DB_SERVER
export const DB_NAME = process.env.DB_NAME
export const FRONTEND_URL = process.env.FRONTEND_URL
export const SESSION_SECRET = process.env.SESSION_SECRET
