FROM node:12.16.3-alpine

# Install pm2 as process manager
RUN yarn global add pm2

# Create app directory
WORKDIR /app

# Copy packaged sources from build/ directory
COPY build/ .

# Expose app API port
EXPOSE 3100

# Build the app for production
CMD ["pm2-runtime", "build/server.js"]
