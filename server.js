const Koa = require('koa')  // TODO: convert to ES6 module?
const mongoose = require('mongoose')
const Task = require('./models/Task')

/**
 * Server configuration
 */
const app = new Koa()

app.use(async context => {
    context.body = 'Hello, World!'
})
app.listen(3000, () => console.log('Koa is listening on port 3000'))

/**
 * Database configuration
 */
const url = 'mongodb://localhost/TaskApp'

mongoose.connect(url, { useNewUrlParser: true })

const db = mongoose.connection
db.once('open', _ => console.log(`Database connected: ${url}`))
db.on('error', error => console.log(`Connection error: ${error}`))

/**
 * Test code
 */
const test = new Task({
    name: 'NODE TEST',
    description: 'NODE DESCRIPTION'
})

test.save((error, document) => {
    if (error) console.error(error)
    console.log(document)
})