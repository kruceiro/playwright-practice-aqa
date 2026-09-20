# Base Image
FROM mcr.microsoft.com/playwright:v1.62.1-noble
# Set the working directory
WORKDIR /tests
# Copy package.json and package-lock.json
COPY package*.json ./
# Install dependencies
RUN npm install
# Copy the rest of the application files
COPY . .
# Set the entry point for the container
CMD ["npx", "playwright", "test", "--project=e2e-firefox", "--workers=1"]