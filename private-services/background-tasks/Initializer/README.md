# Initializer
Initializer runs only once and is used to confirm or instantiate all required resources for the Registration Microservices to operate.

A connection to the MongoDB service is created and the database and collections are set up for the other microservices to leverage.

Although these steps are trivial - there may be additional resource generation requirements in more complex solutions that make this pattern more useful.