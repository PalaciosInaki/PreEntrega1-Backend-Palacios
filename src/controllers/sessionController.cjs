const userModel = require('../models/user.model.cjs');
const { createHashPassword, comparePassword } = require('../utils/bcrypt.cjs');
const generateToken = require('../utils/jwt.cjs');

const login = async (req, res) => {
    try {
        console.log("Usuario autenticado:", req.user); 

        if (!req.user) {  
            return res.status(401).send("Usuario o contraseña incorrecta");
        }

        const token = generateToken(req.user);

        req.session.user = {
            email: req.user.email,
            first_name: req.user.first_name,
        };

        res.cookie('jwt', token, { httpOnly: true, secure: false, maxAge: 3600000 });

        res.status(200).redirect('/products');
    } catch (error) {
        console.error("Error en login:", error); 
        res.status(500).send("Error al loguear usuario");
    }
};


const register = async (req, res) => {
    try {
        if (!req.user) { 
            return res.status(400).send("El mail ya está registrado");
        }

        return res.status(201).json({
            message: "Usuario registrado correctamente",
            user: {
                first_name: req.user.first_name,
                last_name: req.user.last_name,
                email: req.user.email,
                age: req.user.age,
            }
        });

    } catch (error) {
        console.error("Error en el registro:", error);
        return res.status(500).send("Error al registrar usuario");
    }
};

const viewLogin = (req, res) => {
    res.status(200).render('login', {})
}

const viewRegister = (req, res) => {
    res.status(200).render('register', {})
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


module.exports = { login, register, viewLogin, githubLogin, viewRegister};




