FROM docker.io/node:16 AS build
ENV NODE_ENV=production

WORKDIR /road-trip-frontend

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install --production --force
RUN npm install -g serve
RUN npm run build
CMD ["serve -s build"]
