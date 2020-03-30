const express = require('express')
const mongoose = require('mongoose')
const cors = require ('cors')
const http = require('http');

const routes = require('./routes')
const { setupWebsocket } = require('./websocket')

const app = express()
const server = http.Server(app);

setupWebsocket(server);

mongoose.connect('mongodb+srv://omnistack:omnistack@cluster0-wtt4k.mongodb.net/test?retryWrites=Omni10&w=majority', {
  useNewUrlParser: true ,
  useUnifiedTopology: true
})

app.use(cors({origin: "http://localhost:3000"}))
app.use(express.json())// todas as req
app.use(routes)

//Métodos: Get, Post, Put, Delete

//Query Params: GET req.query(Filtros, ordenação, paginação)
//Route Params: PUT E DELETE req.params(Identificar um recurso na alteração ou remoção)
//Body: POST req.body(Dados para a criação ou alteração de um registro)


app.listen(3332)