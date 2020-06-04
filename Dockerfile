FROM node:10-alpine
# FROM node:13.12.0-alpine

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install --silent

COPY . .

CMD [ "node", "src/index.js" ]