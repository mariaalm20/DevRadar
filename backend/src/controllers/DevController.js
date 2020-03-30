const axios = require('axios')
const Dev = require('../models/Dev')
const parseStringAsArray = require('../utils/ParseStringAsArray')
const { findConnections, sendMessage } = require('../websocket')


module.exports = {

async index(req, res){
  const devs = await Dev.find()
  return res.json(devs)
},



async store(req, res){
//informações que precisam que o usuario informe
const {github_user, techs, latitude, longitude} = req.body 

let dev = await Dev.findOne({github_user})

if(!dev){
  //informações que vem de um site e precisam ser mostradas
const response = await axios.get(`https://api.github.com/users/${github_user}`) 
let {name, avatar_url, bio} = response.data
if(!name) {
 name = response.data.login
}

//corta a string pela virgula e transforma em array
//trin remove espaçamentos antes e depois
const techsArray = parseStringAsArray(techs)

const location = {
 type: 'Point',
 coordinates: [longitude, latitude]
}

 dev = await Dev.create({
 github_user, 
 name,
 avatar_url,
 bio,
 techs: techsArray,
 location
}) 

const sendSocketMessageTo = findConnections(
  { latitude, longitude },
  techsArray,
)

sendMessage(sendSocketMessageTo, 'new-dev', dev);

}
return res.json(dev)
 },


 async destroy(req, res){
  const { github_user } = req.params;
  await Dev.deleteOne({ github_user })
  return res.json()
  }


}