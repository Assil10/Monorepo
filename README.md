# Monorepo with Docker Setup

This repository contains three projects:

1. `backend` - Node.js Express API
2. `front-backoffice` - React admin panel built with Vite
3. `front-mobile` - React Native mobile app built with Expo

## Enhanced Docker Setup

This repository is configured with an optimized Docker setup that includes:

- Multi-stage builds for smaller, more efficient images
- Non-root users for improved security
- Health checks for all services
- Docker Compose profiles for selective service startup
- Resource limits to prevent container resource starvation
- Nginx reverse proxy for unified access
- Environment variable configuration

## Prerequisites

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Getting Started with Docker

### Setup Environment Variables

1. Make sure the `.env` file at the root of the project is properly configured with all required variables.

### Build and Start the Docker Containers

You can start services selectively using profiles:

```bash
# Build and start all services
docker compose up -d

# Start only backend services (backend + mongodb)
docker compose --profile backend up -d

# Start only frontend services (front-backoffice + backend + mongodb)
docker compose --profile frontend up -d

# Start only mobile app (front-mobile + backend + mongodb)
docker compose --profile mobile up -d

# Start with nginx reverse proxy
docker compose --profile proxy up -d
```

### View Running Services

```bash
# View status of services
docker compose ps

# View logs of all services
docker compose logs -f

# View logs of a specific service
docker compose logs -f backend
docker compose logs -f front-backoffice
docker compose logs -f front-mobile
```

### Accessing the Applications

- Backend API: http://localhost:3000
- Admin Panel: http://localhost:80
- Mobile App: Use Expo Go app on your mobile device and scan the QR code displayed in the front-mobile container logs
- With Nginx Proxy enabled: http://localhost (routes to both front-backoffice and backend via `/api` prefix)

### Stopping the Docker Containers

```bash
# Stop all services
docker compose down

# Stop and remove volumes (will delete database data)
docker compose down -v
```

## Development Workflow

### Git Branching Conventions

We use a standardized branch naming convention to keep our repository organized:

```
XX-type/short-description
```

Where:

- `XX` are your initials (e.g., AJ for Ahmed Jaziri)
- `type` is the type of change (feature, fix, hotfix, docs)
- `short-description` is a brief description using hyphens for spaces

Examples:

- `AJ-feature/user-auth`
- `TS-fix/login-button`

For more details on our Git workflow, please see [CONTRIBUTING.md](./CONTRIBUTING.md).

### Development vs Production

The Docker setup supports both development and production environments:

```bash
# Development mode (default)
NODE_ENV=development docker compose up -d

# Production mode
NODE_ENV=production docker compose up -d
```

### Rebuilding Services After Changes

```bash
# Rebuild a specific service
docker compose build backend
docker compose build front-backoffice
docker compose build front-mobile

# Rebuild all services
docker compose build

# Rebuild and restart a service
docker compose up -d --build backend
```

### Executing Commands Inside Containers

```bash
# Run a command in a container
docker compose exec backend npm install new-package
docker compose exec front-backoffice npm install new-package
docker compose exec front-mobile npm install new-package

# Open a shell in a container
docker compose exec backend sh
docker compose exec front-backoffice sh
docker compose exec front-mobile sh
```

### Testing

Tests are not automatically run during commits. Before submitting a Pull Request, please run tests manually:

```bash
# Run tests for a specific project
cd backend && npm test
cd front-backoffice && npm test
cd front-mobile && npm test

# Or use the workspace command from the root to run specific project tests
npm run test -w backend
npm run test -w front-backoffice
npm run test -w front-mobile
```

## Security Considerations

- All services run as non-root users for improved security
- Sensitive environment variables are managed through the `.env` file
- Resource limits prevent container resource starvation
- Health checks ensure services are running properly

## Monitoring and Maintenance

### View Container Health

```bash
# Check health status of all containers
docker compose ps

# Get detailed health info
docker inspect --format "{{.Name}}: {{.State.Health.Status}}" $(docker compose ps -q)
```

### Resource Usage

```bash
# View container resource usage
docker stats
```

## Troubleshooting

- **Ports already in use**: Modify the port mappings in `.env` file
- **Container not starting**: Check the logs with `docker compose logs -f <service_name>`
- **Volume permissions**: Run `chmod -R 777 ./data` to fix permission issues with mounted volumes
- **Health check failures**: Check service-specific logs to find the cause
- **Mongo connection issues**: Ensure MongoDB credentials are correctly set in the `.env` file#
