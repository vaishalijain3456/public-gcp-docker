# Day 2 -- this packs our simple Node app into a container, so it can
# run the same way anywhere, including on Cloud Run.
FROM node:24-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci --omit=dev

COPY server.js ./

USER node

EXPOSE 8080

CMD ["node", "server.js"]