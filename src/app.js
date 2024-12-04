const express = require('express');
import productRouter from './routes/products.routes.js';
import cartRouter from './routes/carts.routes.js';
import { create } from 'express-handlebars';  
import { Server as SocketServer } from 'socket.io';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const hbs = create();
const app = express();
const port = 8080;


app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', join(__dirname, 'views'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/api/products', productRouter);
app.use('/api/carts', cartRouter);


import http from 'http';
const server = http.createServer(app);
const io = new SocketServer(server);
export { io };


io.on('connection', (socket) => {
    console.log('Nuevo cliente conectado');
    
    
    socket.on('disconnect', () => {
        console.log('Cliente desconectado');
    });
});



import viewsRouter from './routes/views.routes.js';  
app.use('/', viewsRouter);

server.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
