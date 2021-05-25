# key-value-socket

## How to get running

### Windows:

Make sure you have Hyper-V enabled and WSL2 installed (this is to run linux based systems on Windows)
Install Docker Desktop

### Linux:

Install Docker

### Docker:

#### Run in development mode:

docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d

Attach one of the configured debuggers using vs code if you want to debug tests/app/app inside Docker.

#### Run in production mode:

docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d

#### To stop and remove the container group:

docker-compose down

### Notes:

Keep in mind that both development and prod share the same container_name so when starting one or the other, the container would be recreated to meet the new configuration.
