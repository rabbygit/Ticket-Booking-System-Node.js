const express = require("express")
const cors = require("cors")
const morgan = require("morgan")
const bodyParser = require("body-parser")

// DB Connection here



const app = express()
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())


// Main Routes
const adminRoute = require("./api/routes/admin")

// API URL's
app.use("/api/admin", adminRoute)



// App Port
const port = process.env.PORT || 3000
app.get('/', (req, res) => {
    res.send("Hello I am node.js application")
})

app.listen(port, () => {
    console.log(`App running on ${port} port`)
})
