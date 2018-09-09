/*jshint esversion: 6 */

let API_URI = "http://localhost:8081/api/v1"; //<-- replace 'localhost' with 'public-endpoints' - ie: The name of the docker-compose service
let PROXY_URI = "http://xx.xxx.xxx.xx:8081"; 

//Check if we are getting a API uri from docker-compose:
if(process.env.API_URI) {
    API_URI = process.env.API_URI;
}
if(process.env.PROXY_URI) {
    PROXY_URI = process.env.PROXY_URI;
}

module.exports = {
    API_URI,
    PROXY_URI
};