FROM node:18-alpine

RUN apk add --update docker openrc bash python3 make g++
RUN rc-update add docker boot

WORKDIR /usr/app

COPY package*.json ./
RUN npm i

COPY src ./src

EXPOSE 3000
CMD [ "npm", "run", "start" ]
