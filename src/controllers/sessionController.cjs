const userModel = require('../models/user.model.cjs');
const { createHashPassword, comparePassword } = require('../utils/bcrypt.cjs');

const login = async (req, res) => {
    const { email, password } = req.body

  
    const user = await userModel.findOne({email: email})

    if(!user){
        res.status(404).send("Usuario no encontrado")
    }else{
        if(comparePassword(password, user.password)){
            ///Genero la sesion
            req.session.user = "User"
            req.session.email = user.email
            req.session.first_name = user.first_name
            req.session.last_name = user.last_name
            res.status(200).send("Usuario logueado correctamente")
        }else{
            res.status(401).send("Contraseña incorrecta")
        }
    }
}
 




const register = async (req, res) => {
    const { first_name, last_name, email, age, password } = req.body

    try {
        const newUser = {
            first_name,
            last_name,
            email,
            age,
            password: createHashPassword(password)
        }

        let message = await userModel.create(newUser)

        res.status(201).send("Usuario registrado correctamente: ", message)
    }catch(error){
        res.status(500).send("Error al registrar usuario: ", error)
    }

}


module.exports = { login, register };




