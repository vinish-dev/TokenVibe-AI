FROM node:20-alpine

WORKDIR /app

# Copy root package.json and lockfile
COPY package.json package-lock.json ./

# Copy all workspace package.json files so npm install knows about them
COPY apps/server/package.json apps/server/
COPY apps/client/package.json apps/client/
COPY packages/shared/package.json packages/shared/

# Install dependencies (this will install workspaces)
# We use --omit=dev for the client to save time/space if we only need server,
# but since they share a lockfile, a standard install is safest for monorepos.
RUN npm install

# Copy source code for the backend and shared packages
COPY packages/shared packages/shared/
COPY apps/server apps/server/

# Build the server
WORKDIR /app/apps/server
RUN npm run build

EXPOSE 8080
ENV PORT=8080

CMD ["node", "dist/index.js"]
