const dotenv = require('dotenv');

const passport = require('passport');
const local = require('passport-local').Strategy;
const GithubStrategy = require('passport-github2').Strategy;
const { comparePassword, createHashPassword } = require('../utils/bcrypt.cjs');
const userModel = require('../models/user.model.cjs');
const jwt = require('passport-jwt');

dotenv.config();
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

    passport.use('register', new localStrategy(
        { passReqToCallback: true, usernameField: 'email' },
        async (req, username, password, done) => {
            try {
                const { first_name, last_name, email, age } = req.body;
                console.log("🟢 Recibiendo datos de registro:", { first_name, last_name, email, age, password });
    
                const findUser = await userModel.findOne({ email: username });
                console.log("🔍 Buscando usuario en la base de datos:", findUser);
    
                if (!findUser) {
                    const hashedPassword = createHashPassword(password);
                    console.log("🔑 Contraseña hasheada:", hashedPassword);
    
                    const user = await userModel.create({
                        first_name,
                        last_name,
                        email,
                        age,
                        password: hashedPassword
                    });
    
                    console.log("✅ Usuario creado correctamente:", user);
                    return done(null, user);
                } else {
                    console.log("❌ Usuario ya existe.");
                    return done(null, false, { message: "Usuario ya registrado" });
                }
            } catch (error) {
                console.error("🚨 Error en registro:", error);
                return done(error);
            }
        }
    ));
    
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
            return done(error)  
            
        }

  
        

    }));


    passport.use('github', new GithubStrategy({
        clientID: "Ov23liNYZK3iJlb87laf",
        clientSecret: process.env.SECRET_GITHUB,
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
        secretOrKey: process.env.SECRET_JWT

    }, async (jwt_payload, done) => {
        try {
            return done(null, jwt_payload.user)
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