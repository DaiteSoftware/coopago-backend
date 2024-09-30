export const isAuthenticated = (req, res, next) => {
  if (req.session.usuario) {
    // Si el usuario está autenticado, pasamos al siguiente middleware o ruta
    return next()
  } else {
    // Si no está autenticado, respondemos con un error 401
    return res.status(401).json({ error: 'Usuario no autenticado' })
  }
}
