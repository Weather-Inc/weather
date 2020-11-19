FROM node:12.16.3-alpine

# Create app directory
WORKDIR /app

# Install pm2 as process manager
RUN yarn global add pm2

# Copy packaged sources from build/ directory
COPY build/ .

# Copy node_modules directory
COPY node_modules/ .

# Expose app API port
EXPOSE 3100

# Build the app for production
CMD ["pm2-runtime", "server.js"]
