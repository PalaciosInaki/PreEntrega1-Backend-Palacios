const passport = require('passport');
const local = require('passport-local').Strategy;
const { comparePassword, createHashPassword } = require('../utils/bcrypt.cjs');
const userModel = require('../models/user.model.cjs');

const localStrategy = local.Strategy

const initalizatePassport = () => {

    passport.use('register', new localStrategy({ passReqToCallback: true, usernameField: 'email' }, async (req, username, password, done) => {

        try {
            const { first_name, last_name, email, age, password } = req.body
            const findUser = await userModel.findOne({ email: email })

            if (!findUser) {
                const user = await userModel.create({
                    first_name,
                    last_name,
                    email,
                    age,
                    password: createHashPassword(password)
                })
                return done(null, user)
            } else {
                return done(null, false, { message: "Usuario ya registrado" })
            }
        } catch (error) {
            return done(error)
        }

    }));

    passport.use('login', new localStrategy({ usernameField: 'email' }, async (username, password, done) => {
        try {

            const user = await userModel.findOne({ email: username })

            if (!user) {
                return done(null, false, { message: "Usuario no encontrado" })
            }

            if (!comparePassword(password, user.password)) {
                return done(null, false, { message: "Contraseña incorrecta" })
            }

            return done(null, user)
            
        } catch (error) {
            
        }

  
        

    }));

    /////Pasos necesarios para trabajar via http con passport 
    passport.serializeUser((user, done) => {
        done(null, user._id)
    });

    passport.deserializeUser(async (id, done) => {
        try {
            const user = await userModel.findById(id)
            done(null, user)
        } catch (error) {
            done(error)
        }
    });





}

module.exports = initalizatePassport;