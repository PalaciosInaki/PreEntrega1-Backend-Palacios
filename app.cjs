const dotenv = require('dotenv');
const express = require('express');
const productRouter = require('./src/routes/products.routes.js');
const cartRouter = require('./src/routes/carts.routes.js');
const sessionRouter = require('./src/routes/sessions.routes.js');
const exphbs = require('express-handlebars');  
const { Server: SocketServer } = require('socket.io');
const path = require('path');
const mongoose = require("mongoose");
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const passport = require('passport');
const initalizatePassport = require('./src/config/passport.config.cjs');
const indexRouter = require('./src/routes/index.routes.js');



dotenv.config();
const app = express();
const DBPATH = process.env.URL_MONGO;

////Settings
app.set('port', process.env.PORT || 8080);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs.engine({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'),'layouts'),
    partialsDir: path.join(app.get('views'),'partials'),
    extname: '.hbs'
}))
app.set('view engine', '.hbs');


////Middlewares
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
    store: MongoStore.create({ mongoUrl: DBPATH , ttl: 60 * 60 * 24 } ),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false, 
    cookie: {
        maxAge: 1000 * 60 * 60 * 24
    }

  
}));

app.use(express.urlencoded({ extended: true }));


///rutas
app.use('/public', express.static(path.join(__dirname, 'public')));//concateno rutas
app.use('/', indexRouter);



const http = require('http');
const server = http.createServer(app);
const io = new SocketServer(server);
module.exports = io;


io.on('connection', (socket) => {
    console.log('Nuevo cliente conectado');
    
    
    socket.on('disconnect', () => {
        console.log('Cliente desconectado');
    });
});


//const viewsRouter = require('./src/routes/views.routes.cjs');  
//app.use('/', viewsRouter);

server.listen(app.get('port'), () => {
    console.log(`Servidor corriendo en puerto`, app.get('port'));
});



/// Conexion base de datos



const connectMongoDB= async () => {
  try {
    await mongoose.connect(DBPATH)
    console.log('Connected to Mongo');
    
  } catch (error) {
    console.log('Failed to connect');
    
  }
}

connectMongoDB()

initalizatePassport()
app.use(passport.initialize());
app.use(passport.session());
