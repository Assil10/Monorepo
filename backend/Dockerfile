FROM node:18-alpine AS dependencies

WORKDIR /app

# Copy only package files first for better caching
# Explicitly copy package.json from the backend directory within the context
COPY package.json ./ 
# If package-lock.json exists, copy it too (optional but good for npm install)
COPY package-lock.json* ./

# Use npm install instead of npm ci
RUN npm install

# Development stage - adding this to fix the docker-compose error
FROM node:18-alpine AS development

# Install wget for healthcheck
RUN apk add --no-cache wget

WORKDIR /app
COPY --from=dependencies /app/node_modules ./node_modules
COPY . .

# Expose the API port
EXPOSE 5000

# Health check to verify app is running in development
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD wget -qO- http://localhost:5000/health || exit 1

CMD ["npm", "run", "dev"]

# Build stage
FROM node:18-alpine AS build

WORKDIR /app
# Copy installed node_modules
COPY --from=dependencies /app/node_modules ./node_modules
# Copy package files
COPY package*.json ./
# Copy all necessary source code and config files from the backend directory in the context
COPY . ./ 
# Note: This single command replaces the multiple COPY commands for src, config, controllers, etc.

# Production stage
FROM node:18-alpine AS production

# Install wget for healthcheck
RUN apk add --no-cache wget

# Set node environment 
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /app

# Create a non-root user to run the app
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001 -G nodejs

# Copy necessary files from build stage
COPY --from=build /app/package*.json ./
COPY --from=build /app/node_modules ./node_modules
# Copy the rest of the application code from the build stage
COPY --from=build /app/ ./

# Switch to non-root user
USER nodejs

# Expose the API port
EXPOSE 5000

# Health check to verify app is running
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD wget -qO- http://localhost:5000/health || exit 1

CMD ["npm", "run", "start"]