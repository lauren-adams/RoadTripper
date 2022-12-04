FROM docker.io/node:16 AS build
ENV NODE_ENV=production

WORKDIR /app

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install --production --force
RUN npm install -g serve
RUN npm run build
COPY road-trip-frontend .
WORKDIR road-trip-frontend
CMD ["serve -s build"]
