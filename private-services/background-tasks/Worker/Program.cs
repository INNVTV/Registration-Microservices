using System;
using System.Linq;
using System.Threading;
using System.IO;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Configuration.EnvironmentVariables;
using MongoDB.Driver;
using MongoDB.Driver.Core;
using MongoDB.Bson;

namespace Worker
{
    class Program
    {
        private static string _mongoUri;
        private static string _mongoDbName;

        static void Main(string[] args)
        {

            var builder = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
                .AddEnvironmentVariables(); //<-- Allows for Docker Env Variables

            IConfigurationRoot configuration = builder.Build();

            _mongoUri = configuration["Settings:MongoDbUri"];
            _mongoDbName = configuration["Settings:MongoDbName"];
            var configSource = configuration["Settings:ConfigurationSource"];

            /*

            Injecting configuration via Docker:

            Docker Run:
                $ docker run -e Settings:ConfigurationSource=DockerRun worker

            Docker Compose or .env file:
                environment:
                 - Settings:ConfigurationSource=DockerCompose


            */

            Console.WriteLine("Worker: Started.");
            Console.WriteLine("Instance ID: " + "");
            Console.WriteLine("Configuration Source: " + configSource);

            
            while (true)
            {
                //Runs every 5 minutes to move "new" registrations into the "processed" or "rejected" collection
                Thread.Sleep(120000);
                ProcessRegistrations();
            }       
        }

        public static void ProcessRegistrations()
        {       
            Console.WriteLine("Processing registrations...");

            var client = new MongoClient(_mongoUri);

            //Pick up all latest new registrations
            if(client != null)
            {
                var _database = client.GetDatabase(_mongoDbName);
                var newCollection =_database.GetCollection<BsonDocument>("new");
                var regRecords = newCollection.Find(_ => true).ToList();

                var processedCollection =_database.GetCollection<BsonDocument>("processed");
                var rejectedCollection =_database.GetCollection<BsonDocument>("rejected");

                //Place 80% of registrations into 'processed' collection and 20% into the 'rejected' collection
                foreach(var regRecord in regRecords)
                {
                    int rand = new Random().Next(10); // Random number 0-9

                    if(rand <= 7) {
                        processedCollection.InsertOne(regRecord);
                    }
                    else{
                        rejectedCollection.InsertOne(regRecord);
                    }

                    //remove the record from the origin collection:
                    newCollection.DeleteOne(regRecord);
                }
                
            }

           
        }
    }
}
