FROM node:12.16.3-alpine

# Create app directory
WORKDIR /app

# Install pm2 as process manager
RUN yarn global add pm2

# Copy package.json to app directory
COPY package.json .

# Install app dependencies
RUN yarn install

# Copy packaged sources from build/ directory
COPY build/ .

# Expose app API port
EXPOSE 3100

# Build the app for production
CMD ["pm2-runtime", "server.js"]
