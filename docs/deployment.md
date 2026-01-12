# Deployment Guide

The application is containerized using Docker and is designed to be deployed to any Docker-compatible hosting environment (AWS ECS, DigitalOcean App Platform, Render, etc.).

## Prerequisites

-   Docker Engine installed on the host.
-   PostgreSQL database (external or containerized).

## Production Build

We use a multi-stage Dockerfile to ensure small image sizes.

### Building the API
```bash
docker build -f apps/api/Dockerfile -t my-golden-stack-api .
```

### Building the Web App
```bash
docker build -f apps/web/Dockerfile -t my-golden-stack-web .
```

## Environment Variables

Ensure the following environment variables are set in production:

### API
-   `DATABASE_URL`: Connection string to PostgreSQL.
-   `JWT_SECRET`: Secure random string.
-   `PORT`: (Default: 3000)

### Web
-   `VITE_API_URL`: URL of the deployed API.

## Running with Docker Compose (Production)

You can maintain a separate `docker-compose.prod.yml` for production orchestration if not using a managed orchestrator.

```yaml
version: '3.8'
services:
  api:
    image: my-golden-stack-api
    restart: always
    env_file: .env.production
    ports:
      - "3000:3000"

  web:
    image: my-golden-stack-web
    restart: always
    ports:
      - "80:80"
```
