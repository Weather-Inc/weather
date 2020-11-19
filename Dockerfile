FROM node:12.16.3-alpine

# Create app directory
WORKDIR /app

# Copy package.json to app directory
COPY package.json ./

# Install dependencies
RUN yarn install

# Install pm2 as process manager
RUN yarn global add pm2

# Build app for production
RUN yarn build

# Copy packaged sources from build/ directory
COPY ./build .

# Expose app API port
EXPOSE 3100

# Build the app for production
CMD ["pm2-runtime", "server.js"]
