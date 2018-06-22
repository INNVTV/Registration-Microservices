/*jshint esversion:6 */

const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.use(express.json());

app.set('view engine', 'pug');

/*Map node_modules to public folders - (Otherwise set up a task manager) */
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));
app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js')); 
app.use('/js', express.static(__dirname + '/node_modules/jquery/dist'));

const apiUri = require('./config/config.js').API_URI;

const title = 'Registration Microservices';
const message = 'Please register your account';
let errorsArray = [];

app.get('/', (req, res) => {
    res.render('index', { 
        errors:errorsArray,
        title: title,
        message: message,
        year: new Date().getFullYear(),
        name: '',
        email:''

    });
});

app.post('/', (req, res) => {
    
    //const http = require('http');
    const request = require('request');

    const data = JSON.stringify({
        name: req.body.name,
        email: req.body.email
    });

    request.post({
        headers: {'content-type' : 'application/json'},
        url: apiUri,
        body: data,
        length: data.length
      }, function(error, response, body){
        if (!error && response.statusCode == 201) {
            res.render('success', {
                    name: req.body.name,
                    email: req.body.email,
                    year: new Date().getFullYear()
            });
        }
        else if(response.statusCode == 400)
        {
            var validationResponse = JSON.parse(body);

            res.render('index', {
                errors: validationResponse.errors,
                title: title,
                message: message,
                year: new Date().getFullYear(),
                name: req.body.name,
                email: req.body.email
            });
        }
        else{
            res.render('index', {
                errors: ['An unknown error occurred.'],
                title: title,
                message: message,
                year: new Date().getFullYear(),
                name: req.body.name,
                email: req.body.email
            });
        }
      });
});

app.get('/settings', (req, res) => {
    res.render('settings', {
       api:apiUri 
    });
  });

app.listen(3000, () => console.log("'public-website' listening on port 3000"));