/*jshint esversion: 6 */

let API_URI = "http://localhost:8081/api/v1"; //<-- replace 'localhost' with 'public-endpoints' - ie: The name of the docker-compose service

//Check if we are getting a API uri from docker-compose:
if(process.env.API_URI) {
    API_URI = process.env.API_URI;
}

module.exports = {
    API_URI
};