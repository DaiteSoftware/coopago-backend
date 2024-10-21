import { ConnectionsManager } from './ConnectionsManager.mjs'

import { DB_SERVER,
    DB_PORT,
    DB_NAME,
    DB_USER,
    DB_PWD
 } from '../config.js'


export const sqlConfig = {
    server: DB_SERVER,
    port: DB_PORT,
    database: DB_NAME,
    user: DB_USER,
    password: DB_PWD,
    options: {
        encrypt: true,
        trustServerCertificate: true
    }
}

export const cManager = new ConnectionsManager(sqlConfig)