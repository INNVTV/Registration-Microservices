/*jshint esversion: 6 */

let API_URI = "http://localhost/public-endpoints"; //<-- replace 'localhost' with 'public-endpoints' - ie: The name of the docker-compose service
let API_PORT = "8081"; 

//Check if we are getting a API uri from docker-compose:
if(process.env.API_URI) {
    API_URI = process.env.API_URI;
}

module.exports = {
    API_URI
};