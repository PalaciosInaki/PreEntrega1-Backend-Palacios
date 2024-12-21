const express = require('express');
const productRouter = require('./src/routes/products.routes.cjs');
const cartRouter = require('./src/routes/carts.routes.cjs');
const exphbs = require('express-handlebars');  
const { fileURLToPath } = require('url');
const path = require('path');
const router = require('./src/routes/index.routes')


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

app.use('/api/products', productRouter);
app.use('/api/carts', cartRouter);


const http = require('http');
const server = http.createServer(app);


//const viewsRouter = require('./src/routes/views.routes.cjs');  
//app.use('/', viewsRouter);

server.listen(app.get('port'), () => {
    console.log(`Servidor corriendo en puerto`, app.get('port'));
});
