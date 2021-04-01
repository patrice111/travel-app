const fetch = require('node-fetch')
const dotenv = require('dotenv');
dotenv.config();

const path = require('path')
const express = require('express')
const mockAPIResponse = require('./mockAPI.js')
const cors = require('cors');
const app = express();

app.use(express.static('dist'));
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get('/test', function (req, res) {
    res.send(mockAPIResponse)
});

app.get('*', function (req, res) {
    res.sendFile(path.resolve(__dirname + '/../../dist/index.html'));
});

// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
    console.log('Example app listening on port 8081!')
})

//Global Scope
let projectData = {};