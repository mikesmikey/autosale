const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 5000;
//const cors= require('cors')
app.use(bodyParser.json());
//app.use(cors())

//disable cors due to the server will not using cross origin feature.

const WebDAO = require('./WebDAO');
const WebService = require('./WebService');
const User = require('./User');

app.get('/user', (req, res) => {
    var DAO = new WebDAO;
    DAO.getAllUser().then((data)=> {
        if (data != null) {
            res.json(data);
        } else {
            res.sendStatus(404);
        }
    })
});

app.post('/user', (req, res) => {
    //console.log(req.body.registerForm)
    var DAO = new WebDAO;
    DAO.insertUser(new User(req.body.registerForm)).then((pass)=> {
        if (pass) {
            res.send(pass);
        } else {
            res.sendStatus(406);
        }
    })
});

app.get('/user/:username', (req, res) => {
    var DAO = new WebDAO;
    DAO.getUserByUsername(req.params.username).then((data)=> {
        if (data != null) {
            res.json(data);
        } else {
            res.sendStatus(404);
        }
    })
})

app.get('/login', (req, res) => {
    loginAuth(req);
})


app.listen(port, () => {
    console.log(`App listening on ${port}`);
})