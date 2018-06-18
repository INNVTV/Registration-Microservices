using System;
using System.Threading;
using System.IO;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Configuration.EnvironmentVariables;

namespace Worker
{
    class Program
    {
        private string _mongoUri;
        private string _mongoDbName;

        static void Main(string[] args)
        {

            var builder = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
                .AddEnvironmentVariables(); //<-- Allows for Docker Env Variables

            IConfigurationRoot configuration = builder.Build();

            var _mongoUri = configuration["Settings:MongoDbUri"];
            var _mongoDbName = configuration["Settings:MongoDbName"];
            var configSource = configuration["Settings:ConfigurationSource"];

            /*

            Injecting configuration via Docker:

            Docker Run:
                $ docker run -e Settings:ConfigurationSource=DockerRun worker

            Docker Compose:
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
            Console.WriteLine("Worker: Processing...");
        }
    }
}
