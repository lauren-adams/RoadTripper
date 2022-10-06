FROM docker.io/node:16 AS build
WORKDIR /build
COPY . .

RUN npm install
RUN npm run start
