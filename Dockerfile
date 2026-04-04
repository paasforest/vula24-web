FROM node:20-alpine

WORKDIR /app

# Install dependencies first (layer-cached unless package.json changes)
COPY package.json ./
RUN npm install --omit=dev

# Copy application source
COPY src/ ./src/

# Railway injects PORT automatically; default to 3000 for local runs
ENV PORT=3000
ENV NODE_ENV=production

EXPOSE 3000

CMD ["node", "src/server.js"]
