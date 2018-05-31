# registration-microservices
Dockerized microservices using node.js, .net core and Azure.

## Installation
Registration Microservices uses Docker Compose to deploy images associated with each project. Each project has an associated Dockerfile.

## Configuration
Docker Secrets and runtime enviornment variables.

## Projects

### Initializer
.Net Core Console App that checks for  required SQL tables and storage accounts. Creates them if they do not exist.

### Public Web Service
Public endpoints for registering new accounts.

### Public Website
Web UI for registering new accounts.

### Private Web Service
Internal service used by other microservices to interact with the registration system.


