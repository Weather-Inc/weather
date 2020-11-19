FROM node:12.16.3-alpine

# Install pm2 as process manager
RUN yarn global add pm2

RUN mkdir -p ~/.pm2/node_modules

# Create app directory
WORKDIR /app

# Copy packaged sources from build/ directory
COPY build/ .

# Expose app API port
EXPOSE 3100

# Build the app for production
CMD ["pm2-runtime", "server.js"]
