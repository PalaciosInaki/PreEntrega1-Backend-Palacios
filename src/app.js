const express = require('express');
import productRouter from './routes/products.routes';
import cartRouter from './routes/carts.routes';

const app = express();
const port = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('ping', (req, res) =>{
    res.send('pong');
})

app.use('/api/products', productRouter)

app.use('/api/carts', cartRouter)

app.use 


app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
})