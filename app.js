const express = require('express')
const productsRoutes = require('./routes/productsRoutes.js')
const fs = require("fs");
const morgan = require('morgan')
const app = express()
const port = 8000

//middleware
app.use(morgan('tiny'))

//don't forget use express.json() 
app.use(express.json())

//routes
app.use('/products', productsRoutes);

app.listen(port, () => {
    console.log(`server run on http://localhost:${port}`)
})