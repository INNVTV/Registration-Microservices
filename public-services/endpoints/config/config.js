/*jshint esversion: 6 */

let DB_URI = "mongodb://mongodb:27017/registrations"; //<-- replace 'localhost' with 'mongodb' - ie: The name of the docker-compose service

//Check if we are getting a DB uri from docker-compose:
if(process.env.MONGO_DB_URI) {
    DB_URI = process.env.MONGO_DB_URI;
}

module.exports = {
    DB_URI
};