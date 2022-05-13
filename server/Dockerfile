FROM node:18-alpine

RUN apk add --update bash python3 make g++ \
    && rm -rf /var/cache/apk/*

WORKDIR /usr/app

COPY package*.json ./
RUN npm i

COPY src ./src

EXPOSE 3000
CMD [ "npm", "run", "start" ]
