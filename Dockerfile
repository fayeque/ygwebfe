# Step 1: Use the latest Node.js as the base image
FROM node:current-alpine AS builder

# Step 2: Set working directory
WORKDIR /app

# Step 3: Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Step 4: Copy the rest of the application
COPY . .

# Step 5: Build the application
RUN npm run build

# Step 6: Use the latest lightweight web server for production
FROM node:current-alpine

# Step 7: Set working directory
WORKDIR /app

# Step 8: Copy build files from the builder stage
COPY --from=builder /app ./

# Step 9: Install only production dependencies
RUN npm install --production

# Step 10: Expose port and define start command
EXPOSE 3000
CMD ["npm", "run", "start"]
