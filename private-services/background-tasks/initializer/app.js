/*jshint esversion: 6 */

const sleep = require('system-sleep');

const MongoClient = require('mongodb').MongoClient;

console.log("Initializer: Connecting to MongoDB instance...");

const url = "mongodb://mongodb:27017/registrations"; //<-- replace 'localhost' with 'mongodb' - ie: The name of the docker-compose service

console.log("Initializer: Sleeping for 10 seconds to allow for MongoDB to allow for connections...");
sleep(10000);
console.log('Initializer: AWAKE!');

MongoClient.connect(url, function(err, db){
    if(err){
        console.log("Initializer: Error: " + err);
    }
    else{

        console.log("Initializer: Connected!");
        console.log("Initializer: Creating Collections...");
        const dbo = db.db("registrations");

        let createNewCollection = function(){
            return new Promise(function(resolve, reject){

                //Create the 'new' collection:
                dbo.createCollection("new", function(err, res){
                    if (err) reject("Initializer: 'new' collection rejected: " + err);
                    console.log("Initializer: 'new' collection created!");

                    //resolve the promise:
                    resolve("'new' collection created!");
                });

            });
        };

        let createProcessedCollection = function(){
            return new Promise(function(resolve, reject){

                //Create the 'processed' collection:
                dbo.createCollection("processed", function(err, res){
                    if (err) reject("Initializer: 'processed' collection rejected: " + err);
                    console.log("Initializer: 'processed' collection created!");

                    //resolve the promise:
                    resolve("'processed' collection created!");
                });

            });
        };

        let createRejectedCollection = function(){
            return new Promise(function(resolve, reject){

                //Create the 'rejected' collection:
                dbo.createCollection("rejected", function(err, res){
                    if (err) reject("Initializer: 'rejected' collection rejected: " + err);
                    console.log("Initializer: 'rejected' collection created!");

                    //resolve the promise:
                    resolve("'rejected' collection created!");
                });

            });
        };

        
        let closeConnection = function(){
            //Once the promises are complete we can close the database:
            db.close();
            console.log("Initializer: Mongo db closed. Initializer complete.");
        };


        //Order the promises and initiate:
        createNewCollection().then(function(){
            return createProcessedCollection();
        }).then(function(){
            return createRejectedCollection();
        }).then(function(){
            return closeConnection();
        });
        
    }
});
