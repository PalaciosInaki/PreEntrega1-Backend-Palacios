const passport = require('passport');
const local = require('passport-local').Strategy;
const GithubStrategy = require('passport-github2').Strategy;
const { comparePassword, createHashPassword } = require('../utils/bcrypt.cjs');
const userModel = require('../models/user.model.cjs');
const jwt = require('passport-jwt');


const localStrategy = local.Strategy
const JWTStrategy = jwt.Strategy
const ExtractJWT = jwt.ExtractJwt

const cookieExtractor = (req) => {
    let token = null;
    if (req && req.cookies) {
        token = req.cookies['jwt'];
    }
    return token;
}

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


    passport.use('github', new GithubStrategy({
        clientID: "Ov23liNYZK3iJlb87laf",
        clientSecret: "838875aab34663b912aec613b589adeb9cfd8e0c",
        callbackURL: "http://localhost:8080/sessions/github/callback"
        
    }, async (accessToken, refreshToken, profile, done) => {
        try {
            const email = profile._json.email || `${profile.username}@github.com`;/////Git hub no proporciona el email, cambie configuraciones y di permisos pero no
            const user = await userModel.findOne({ email: email })
            if (!user) {
                console.log(profile)
                const newUser = await userModel.create({
                    first_name: profile._json.name,
                    last_name : " ", //dato no proporcionado por git
                    email: email,
                    password: '12345', //dato no proporcionado por git, se genera por defecto
                    age: 18 //Dato no proporcionado por git
                })
                return done(null, newUser)
            }
            return done(null, user)


        } catch (error) {
            return done(error)
        }
    }));


    passport.use('jwt', new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),
        secretOrKey: 'jwtSecret'

    }, async (jwt_payload, done) => {
        try {
            return done(null, jwt_payload)
        } catch (e) {
            return done(e)
            
        }
    }))
       

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