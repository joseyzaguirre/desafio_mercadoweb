const express = require('express')
const nunjucks = require('nunjucks')
const fs = require('fs').promises

const app = express()
app.use(express.static('static'))
app.use(express.static('node_modules/bootstrap/dist'))

nunjucks.configure('views', {
    express: app,
    autoescape: true
})

app.get('/', async (req, res) => {

    let data = await fs.readFile("productos.json", 'utf-8');
    data = JSON.parse(data)
    const productos = data.productos
    console.log({productos})

    res.render('index.html', { productos })
})

app.listen(3000, () => console.log('Servidor corriendo en puerto 3000'))