# Step 1: Build & Production Environment
FROM node:20-alpine AS production

WORKDIR /app

# Copy dependency files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy application files
COPY . .

# Build Vite frontend assets
RUN npm run build

# Expose server port
EXPOSE 3001

# Set production environment variables
ENV NODE_ENV=production
ENV PORT=3001

# Command to launch Express server
CMD ["node", "server/index.js"]
