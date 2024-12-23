const express = require('express');
const productRouter = require('./src/routes/products.routes.js');
const cartRouter = require('./src/routes/carts.routes.js');
const exphbs = require('express-handlebars');  
const { Server: SocketServer } = require('socket.io');
const path = require('path');
const router = require('./src/routes/index.routes');
const mongoose = require("mongoose");


const app = express();


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

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

///ROUTES 

//app.get('/xd', (req, res) =>{
  //  res.render('index')

//})
//

app.use('/', router);
app.use('/products', productRouter);
app.use('/carts', cartRouter)



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
const DBPATH = "mongodb+srv://lokitan74138:1LGCC9ryZkanEJ1J@cluster0.cstf4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

const connectMongoDB= async () => {
  try {
    await mongoose.connect(DBPATH)
    console.log('Connected to Mongo');
    
  } catch (error) {
    console.log('Failed to connect');
    
  }
}

connectMongoDB()