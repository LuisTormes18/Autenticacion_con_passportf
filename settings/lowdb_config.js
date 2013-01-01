const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

// creando el adadtador y el dbObject

const adapter = new FileSync('./database/db.json')
const db = low(adapter)

// db.defaults({users:[]}).write()

module.exports = db;

 

