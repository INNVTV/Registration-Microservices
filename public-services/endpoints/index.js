/*jshint esversion:6 */

const express = require('express');
const app = express();

const validation = require('./validation.js');

const DataConnection = require('./dataConnection');
const dataConnection = new DataConnection();

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Welcome to the public registration service!');
});

app.get('/api/v1/', (req, res) => {
    res.send('API: version 1 status.');
});

app.post('/api/v1/', (req, res) => {

    // Fiddler: Content-Type: application/json; charset=utf-8
    // Body: {"name":"Name", "email":"name@email.com"}

    const validationResponse = validation.validateRegistration(req);

    if(!validationResponse.isValid){
        return res.status(400).json(validationResponse);
    }

    const registrationModel = {
        name: req.body.name,
        email: req.body.email,
        dateCreated: Date.now()
    };

    dataConnection.insertNewRegistration(registrationModel);

    return res.json(201, registrationModel);
});

app.listen(3000, () => console.log("'public-endpoints' listening on port 3000"));