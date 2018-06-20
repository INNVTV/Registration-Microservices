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
const apiPort = require('./config/config.js').API_PORT;

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

    
    const http = require('http');

    const data = JSON.stringify({
        'name': req.body.name,
        'email': req.body.email
    });

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

    res.render('index', { name: 'message' });

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