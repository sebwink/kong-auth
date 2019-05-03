FROM node:10-slim

RUN apt-get update && apt-get -y upgrade
RUN apt-get install -y openssl
RUN npm i -g nodemon
RUN mkdir /app

WORKDIR /app

COPY package.json .
COPY src src 

RUN npm install

CMD ["nodemon", "src/main.js"]
