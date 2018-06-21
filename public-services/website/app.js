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
/*
    request.post(
        apiUri,
        data,  
        function (error, response, body) {
            if (!error && response.statusCode == 200) {
                console.log(body);
            }
            else{
                console.log(body);
                console.log(apiUri + "-" + data);
            }
        }
    );*/

    /*

    const options = {
        host: apiUri,
        port: apiPort,
        path: '/',
        method:'POST',
        headers:{
            'Content-Type':'application/json; charset=utf-8',
            'Content-Length': data.length
        }
    };

    let httpRequest = http.request(options, function(httpResponse){
        let msg = '';
        httpResponse.setEncoding('utf8');
        httpResponse.on('data', function(chunk) {
            msg += chunk;
        });
    });

    httpRequest.write(data);
    httpRequest.end();
    */

    //res.render('index', { name: 'message' });

    /*
    res.render('success', {
        name: req.body.name,
        email: req.body.email,
        year: new Date().getFullYear()
    });

    errorsArray = ['1', '2', '3'];

    res.render('index', {
        errors: errorsArray,
        title: title,
        message: message,
        year: new Date().getFullYear(),
        name: req.body.name,
        email: req.body.email
    });*/
});

app.listen(3000, () => console.log("'public-website' listening on port 3000"));