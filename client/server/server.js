const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 5000
app.use(bodyParser.json())
app


app.get('/', (req, res) => {
    mongoClient.connect(url, (err, client) => {
        console.log('Connected successfully to server');
    })
})

app.listen(port, () => {
    console.log(`App listening on ${port}`)
})