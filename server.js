const express = require('express')
const cors = require('cors')
const app = express()

// CORS-enabled for specific origin
var corOptions = {
    origin: 'http://localhost:3000'
}

// middleware
app.use(express.json())
app.use(cors())
// app.use(cors(corOptions))
app.use(express.urlencoded({ extended: true }))

//routers
const routerProduct = require('./routes/productRoutes.js')
app.use('/api', routerProduct)


// test api
// app.get('/', function (req, res) {
//     res.send('Hello World')
// })


//define port
const PORT = process.env.PORT || 5000
// serve static folder
// app.use('Images', express.static('./Images'))
// app.use(express.static('Images'));
app.use(express.static('public'));

// server
app.listen(PORT, () => {
    console.log(`Server running at port ${PORT}`)
})