import app from './app.js'
import {
  DB_SERVER,
  DB_PORT,
  DB_NAME,
  PORT,
  DB_USER,
  DB_PWD
} from './config.js'
const requiredEnvVars = {
  DB_SERVER,
  DB_PORT,
  DB_NAME,
  DB_USER,
  DB_PWD
}

for (const [key, value] of Object.entries(requiredEnvVars)) {
  if (!value) {
    throw new Error(`${key} is missing`)
  }
}

app.listen(PORT, () => {
  console.log('Server on port', PORT)
})
