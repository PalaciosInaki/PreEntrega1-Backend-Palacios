const userModel = require('../models/user.model.cjs');
const { createHashPassword, comparePassword } = require('../utils/bcrypt.cjs');
const generateToken = require('../utils/jwt.cjs');

const login = async (req, res) => {
    try {
        if(!req.user){ //consulta si el usuario no esta logueado
            res.status(401).send("Usuario o contraseña incorrecta")
        }

        const token = generateToken(req.user)

        req.session.user = {
            email : req.user.email,
            first_name : req.user.first_name,
        }
        ///previo a redirect envio la cookie
        res.cookie('jwt', token, { httpOnly: true, secure: false, maxAge: 3600000})

        res.status(200).redirect('/products')
        
    } catch (error) {
        res.status(500).send("Error al loguear usuario")
        
    }

}
 

const register = async (req, res) => {
    try {
        if(!req.user){ //consulta si el usuario no esta logueado
            res.status(400).send("El mail ya esta registrado")
        }
        res.status(201).send("Usuario registrado correctamente")

        
    } catch (error) {
        res.status(500).send("Error al registrar usuario")
    }
}

const viewLogin = (req, res) => {
    res.status(200).render('login', {})
}



const githubLogin = (req, res) => {
    try {
        req.session.user = {
            email : req.user.email,
            first_name : req.user.first_name,
        }
        res.status(200).redirect('/products')
        
    } catch (error) {
        res.status(500).send("Error al loguear usuario")
        
    }
    
    
}


module.exports = { login, register, viewLogin, githubLogin};




