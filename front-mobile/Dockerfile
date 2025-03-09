FROM node:18-alpine AS dependencies

WORKDIR /app

# Copy only package files first for better caching
COPY package*.json ./
RUN npm ci --legacy-peer-deps

# Development stage
FROM node:18-alpine AS development

WORKDIR /app
COPY --from=dependencies /app/node_modules ./node_modules
COPY . .

# Create a non-root user to run the app
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001 -G nodejs && \
    chown -R nodejs:nodejs /app

# Switch to non-root user
USER nodejs

# Expose the ports that Expo uses
EXPOSE 19000
EXPOSE 19001
EXPOSE 19002

# Health check for Expo dev server
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD wget -qO- http://localhost:19000/status || exit 1

CMD ["npm", "start"]

# Build stage - use this for production builds if needed
FROM node:18-alpine AS build

WORKDIR /app
COPY --from=dependencies /app/node_modules ./node_modules
COPY . .

# Create a non-root user to run the app
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001 -G nodejs && \
    chown -R nodejs:nodejs /app

# Switch to non-root user
USER nodejs

# Expose the ports that Expo uses
EXPOSE 19000
EXPOSE 19001
EXPOSE 19002

# Health check for Expo dev server
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD wget -qO- http://localhost:19000/status || exit 1

CMD ["npm", "start"] 