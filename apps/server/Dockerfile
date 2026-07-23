FROM node:20-alpine

WORKDIR /app

# Copy the server package files
COPY package.json package-lock.json* ./

# Install dependencies
RUN npm install

# Copy source code and prisma schema
COPY . .

# Generate Prisma Client (even though we don't strictly need it for history, the code still imports it)
RUN npx prisma generate

# Build TypeScript code (if there is a build step, though currently we use ts-node or run directly)
# Since the server currently runs using tsx/ts-node, we'll install it globally or run it directly
RUN npm install -g typescript ts-node

EXPOSE 8080
ENV PORT=8080

CMD ["npx", "ts-node", "src/index.ts"]
