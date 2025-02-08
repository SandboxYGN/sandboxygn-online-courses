# Use an official Node.js runtime as a base image
FROM node:22-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy application source code
COPY . .

# Install dependencies
RUN npm install --only=production


# Expose the port the app runs on
EXPOSE 80

# Start the application
CMD ["node", "app.js"]
