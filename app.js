const express = require("express")
const cors = require("cors")
const morgan = require("morgan")
const bodyParser = require("body-parser")
const mongoose = require('mongoose');

// DB Connection here
mongoose.connect('mongodb://localhost:27017/test', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});


const app = express()
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())


// Main Routes
const adminRoute = require("./api/routes/admin")
const merchantRoute = require("./api/routes/merchant")

// API URL's
app.use("/dhakaboss/ticketing/api/admin", adminRoute)
app.use("/dhakaboss/ticketing/api/merchant", merchantRoute)



// App Port
const port = process.env.PORT || 3000
app.get('/', (req, res) => {
    res.send("Hello I am node.js application")
})

app.listen(port, () => {
    console.log(`App running on ${port} port`)
})
