FROM node:12-alpine

COPY package*.json ./
RUN yarn install
COPY ./ ./app/api

WORKDIR /app/api
CMD yarn run start:prod
