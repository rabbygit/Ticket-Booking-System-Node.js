const express = require("express")
const cors = require("cors")
const morgan = require("morgan")
const bodyParser = require("body-parser")
const mongoose = require('mongoose');

// DB Connection here
mongoose.connect('mongodb://localhost:27017/test', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});


const app = express()
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())


// Main Routes
const adminRoute = require("./api/routes/admin")

// API URL's
app.use("/dhakaboss/ticketing/api/admin", adminRoute)

app.use((req, res, next) => {
    let error = new Error('404 page Not Found')
    error.status = 404
    next(error)
})

app.use((error, req, res, next) => {
    if (error.status == 404) {
        return res.status(404).json({
            message: error.message
        })
    }
    if (error.status == 400) {
        return res.status(400).json({
            message: "Bad request"
        })
    }
    return res.status(500).json({
        message: "Internal Server Error"
    })
})

// App Port
const port = process.env.PORT || 3000
app.get('/', (req, res) => {
    res.send("Hello I am node.js application")
})

app.listen(port, () => {
    console.log(`App running on ${port} port`)
})
