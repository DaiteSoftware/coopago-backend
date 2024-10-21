import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../config.mjs'

export const verifyJWT = (req, res, next) => {
    const authHeader = req.headers['autorization']
    if (!authHeader) return res.status('401').json({error: 'No autorized'})
    const token = authHeader.split(' ')[1]
    jwt.verify(
        token,
        JWT_SECRET,
        (err, decoded) => {
            if (err) return res.status('403');
            req.user = decoded.username
            req.database = decoded.database
            next()
        }
    )

}