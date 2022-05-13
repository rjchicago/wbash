FROM node:18-alpine

RUN apk add --update python3 make g++ \
    && rm -rf /var/cache/apk/*

WORKDIR /usr/app

COPY package*.json ./
RUN npm i

COPY index.html ./
COPY styles ./styles
COPY src ./src
RUN npm run build

EXPOSE 8080
CMD [ "npm", "run", "start" ]
