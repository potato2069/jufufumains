FROM node:20-alpine

# Install OpenSSL
RUN apk add --no-cache openssl

# Create app directory
WORKDIR /app

# Install dependencies first (cached layer, only re-runs if package.json changes)
COPY package*.json ./

# Copy Schema Folder
COPY prisma ./prisma    

RUN npm install

# Copy the rest of the project
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Expose the port
EXPOSE 3000

# Start the server
CMD ["node", "server.js"]