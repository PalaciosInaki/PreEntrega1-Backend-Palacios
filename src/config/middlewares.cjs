const authorization = (role) => {
    return async (req, res, next) => {
        //consultar si sesion activa
        if(!req.user) return res.status(401).send("No autenticado")
        if(req.user.role !== role) return res.status(403).send("No autorizado")
        next()  
    }
}

module.exports = authorization;