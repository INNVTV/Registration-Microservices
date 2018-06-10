/*jshint esversion: 6 */

const MongoClient = require('mongodb').MongoClient;
const url = require('./config/config.js').DB_URI;

class DataConnection {

    insertNewRegistration(name) {
        MongoClient.connect(url, function(err, db){
            if(err){
                console.log("Mongo connection error: " + err);
            }
            else{
        
                const dbo = db.db("registrations");
        
                let insertRecord = function(){
                    return new Promise(function(resolve, reject){
        
    
                        var newRecord = {name: name, city: 'Sherman Oaks', state: 'CA', createdDate: Date.UTC.toString()};
                        dbo.collection('new').insertOne(newRecord, function(err, res){
                            if(err) throw err;
                            //resolve the promise:
                            resolve("Record created!");
                        });
        
                    });
                };
                
                let closeConnection = function(){
                    //Once the promises are complete we can close the database:
                    db.close();
                    console.log("Mongo db closed. Record inserted.");
                };
        
        
                //Order the promises and initiate:
                insertRecord().then(function(result){
                    console.log(result);
                    return closeConnection();
                });
                
            }
        });
    }

}

module.exports = DataConnection;

