# Use the official Node.js image.
FROM node:20

# Create and change to the app directory.
WORKDIR /usr/src/app

# Copy application dependency manifests to the container image.
COPY package*.json ./

# Install dependencies.
RUN npm install

# Copy local code to the container image.
COPY . .

# Build the app.
RUN npm run build

# Set the port environment variable.
ENV PORT 8080

# Expose the port.
EXPOSE 8080

# Run the web service on container startup.
CMD [ "npm", "start" ]
