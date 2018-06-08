# Registration Microservices
Dockerized microservices using node.js, .net core and Docker Compose. Can run on the AWS, Azure, Google, IBM or other clouds. This code should be considered a template or spec to designing dockerized SaaS applications using a microservices pattern.

### Notes
This sample uses a containerized MongoDB instance. For a production use case you will want to consider a managed database instance.

In a production enviornment you would want to mix in some cloud services such as a queue from AWS or Azure in place of Redis for your messaging system.

The goal with this project is to create a completly standalone set of components that can be run locally as an orchastrated microservice built with containers. I wanted to limit the amount of 3rd party dependancies and wanted a flexible codebase that cane be refactored to work with any of the major cloud platforms.

## Installation
Registration Microservices uses Docker Compose to deploy images associated with each project. Each project has an associated Dockerfile.

You can run locally using:

   >docker-compose up

## Configuration
Docker Secrets and runtime enviornment variables. Production solutions should consider RPC solutions such as Envoy or gRPC in place of Nginx.

## Projects (Public)



### Public Web Service
Public endpoints for registering new accounts. Uses Express, Joi and Hapi.

### Public Website
Web UI for registering new accounts. Uses the MEAN stack.



## Projects (Private)

### Private Web Service
Internal service used by other microservices to interact with the registration system. Uses Express, Joi and Hapi.

### Private Admin Console
Internal administration site that gives you visibility into new registrations, account provisioning and overall management of the microservice.

### Initializer
.Net Core Console App that checks for  required SQL tables and storage accounts. Creates them if they do not exist.

### Worker
NodeJS worker that picks up new registrations from the Mongo instance and provisions the accounts. Should be replaced with a message queuing system in production enviornments.