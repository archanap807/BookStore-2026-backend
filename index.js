//  import all packages
const express = require('express')
const cors = require('cors')

// loads .env file contents into process .envby default
require('dotenv').config()
const routes = require('./routes/allRoutes')
require('./config/db')

// create server
const server = express()

// enable cors in server 
server.use(cors())

// parse json to js content
server.use(express.json())

// use routes
server.use(routes)

// port
const PORT = process.env.PORT

// start server 
server.listen(PORT,()=>{
    console.log("server started.....");
    
})

// resolve api in browser using get request 
server.get('/',(req,res)=>{
    res.status(200).send('<h1>Server Started and waiting for request!!!!</h1>')
})

server.post("/",(req,res)=>{
    res.status(200).send("<h2>post request</h2>")
})