/*jshint esversion:6 */

const express = require('express');
const app = express();

app.use(express.json());

app.set('view engine', 'pug');

/*Map node_modules to public folders - (Otherwise set up a task manager) */
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));
app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js')); 
app.use('/js', express.static(__dirname + '/node_modules/jquery/dist'));

app.get('/', (req, res) => {
    res.render('index', { 
        title: 'Registration Microservices',
        message: 'Hello there!',
        copy: 'This is test copy'

    });
});



app.listen(3000, () => console.log("'public-website' listening on port 3000"));