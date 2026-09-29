# Day 11 -- This packs the GraphQL backend server into a container, so it
# is ready to put online on Cloud Run later. Putting it online costs
# money, so that part is on hold (see Day-11/outcomes.txt).
FROM node:24-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --omit=dev

COPY server.js ./

USER node

# Day 11 -- our code already reads the PORT setting from the environment
# (and uses 4000 if none is given), so this is ready for Cloud Run.
EXPOSE 8080

CMD ["node", "server.js"]
