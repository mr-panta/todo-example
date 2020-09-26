const express = require('express')
const bodyParser = require('body-parser')
const user = require('./user.js')
const app = express()
const port = 3000

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(bodyParser.raw())

// Example API
app.post('/example', (req, res) => {
    const data = {
        body: req.body,
        query: req.query,
    }
    res.send(data)
})

// User API
app.post('/login', user.login)

// Todo API
// TODO: Aong

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
