FROM node:20-alpine

WORKDIR /app

# Copy the server package files
COPY package.json package-lock.json* ./

# Install dependencies
RUN npm install

# Copy source code and prisma schema
COPY . .

# Build TypeScript code
RUN npm run build

EXPOSE 8080
ENV PORT=8080

CMD ["node", "dist/index.js"]
