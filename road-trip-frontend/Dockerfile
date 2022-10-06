FROM docker.io/node:16 AS build
ENV NODE_ENV=production

WORKDIR /app

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install --production

COPY . .
CMD ["npm", "start"]
