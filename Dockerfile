FROM node:14-alpine

WORKDIR /app

COPY package.json package-lock.json /app/
RUN npm ci --production

COPY server.mjs /app/

CMD ["node", "server.mjs"]
