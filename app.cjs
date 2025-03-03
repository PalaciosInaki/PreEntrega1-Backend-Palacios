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




const app = express();
const DBPATH = "mongodb+srv://lokitan74138:1LGCC9ryZkanEJ1J@cluster0.cstf4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"


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
app.use(cookieParser("cookieSecret"));
app.use(session({
    store: MongoStore.create({ mongoUrl: DBPATH , ttl: 60 * 60 * 24 } ),
    secret: 'sessionSecret',
    resave: false,
    saveUninitialized: false, 
    cookie: {
        maxAge: 1000 * 60 * 60 * 24
    }

  
}));

app.use(express.urlencoded({ extended: true }));


///rutas
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
