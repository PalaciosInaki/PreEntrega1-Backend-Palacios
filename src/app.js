const express = require('express');
import productRouter from './routes/products.routes';

const app = express();
const port = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));





app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
})