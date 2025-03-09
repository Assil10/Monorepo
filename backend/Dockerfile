FROM node:18-alpine AS dependencies

WORKDIR /app

# Copy only package files first for better caching
COPY package*.json ./
RUN npm ci

# Development stage - adding this to fix the docker-compose error
FROM node:18-alpine AS development

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
COPY --from=dependencies /app/node_modules ./node_modules
COPY . .

# Production stage
FROM node:18-alpine AS production

# Set node environment 
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /app

# Create a non-root user to run the app
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001 -G nodejs

# Copy only necessary files from build stage
COPY --from=build /app/package*.json ./
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/src ./src

# Switch to non-root user
USER nodejs

# Expose the API port
EXPOSE 5000

# Health check to verify app is running
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD wget -qO- http://localhost:5000/health || exit 1

CMD ["npm", "run", "start"] 