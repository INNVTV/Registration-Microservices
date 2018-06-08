/*jshint esversion:6 */

const express = require('express');
const app = express();

const registrationModel = require('./models/registration');
const validation = require('./validation');

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Welcome to the public registration service.');
});

app.post('/api/v1/register', (req, res) => {
    validation.validateRegistration();
});

app.listen(3000, () => console.log("'public-endpoints' listening on port 3000"));