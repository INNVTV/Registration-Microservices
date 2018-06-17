# Worker Role
Polls registration database. Processes new registrations, provisions resources for new tenants.

## Current implementation
In the current spec the worker runs every 2 minutes to move "new" registrations into the "processed" or "rejected" collection. A small fraction of registrations will be rejected 

## Production Notes
In a real world implementation of this spec athe worker role will include provisioning scripts for resources required for each tenant.