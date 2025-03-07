# Monorepo with Docker Setup

This repository contains three projects:
1. `backend` - Node.js Express API
2. `front-backoffice` - React admin panel built with Vite
3. `front-mobile` - React Native mobile app built with Expo

## Prerequisites

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Getting Started with Docker

### Setup Environment Variables

1. Make sure the `.env` file at the root of the project is properly configured with all required variables.

### Build and Start the Docker Containers

```bash
# Build and start all services in detached mode
docker-compose up -d

# View logs of all services
docker-compose logs -f

# View logs of a specific service
docker-compose logs -f backend
docker-compose logs -f front-backoffice
docker-compose logs -f front-mobile
```

### Accessing the Applications

- Backend API: http://localhost:3000
- Admin Panel: http://localhost:80
- Mobile App: Use Expo Go app on your mobile device and scan the QR code displayed in the front-mobile container logs

### Stopping the Docker Containers

```bash
# Stop all services
docker-compose down

# Stop and remove volumes (will delete database data)
docker-compose down -v
```

## Development Workflow

### Rebuilding Services After Changes

If you make changes to the Dockerfile or dependencies:

```bash
# Rebuild a specific service
docker-compose build backend
docker-compose build front-backoffice
docker-compose build front-mobile

# Rebuild all services
docker-compose build

# Rebuild and restart a service
docker-compose up -d --build backend
```

### Executing Commands Inside Containers

```bash
# Run a command in a container
docker-compose exec backend npm install new-package
docker-compose exec front-backoffice npm install new-package
docker-compose exec front-mobile npm install new-package

# Open a shell in a container
docker-compose exec backend sh
docker-compose exec front-backoffice sh
docker-compose exec front-mobile sh
```

## Troubleshooting

- **Ports already in use**: Modify the port mappings in `.env` file
- **Container not starting**: Check the logs with `docker-compose logs -f <service_name>`
- **Volume permissions**: Run `chmod -R 777 ./data` to fix permission issues with mounted volumes 