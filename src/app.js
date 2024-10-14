import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import login from './routes/login.routes.js'
import session from 'express-session'
import { SESSION_SECRET } from './config.js'
import getStoredProcedures from './routes/procedures.routes.js'
const app = express()

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}))
app.use(morgan('dev'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
  })
)

// Routes
app.use('/api', login)
app.use('/api', getStoredProcedures)

export default app
