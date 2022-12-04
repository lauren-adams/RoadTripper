FROM docker.io/node:16 AS build
ENV NODE_ENV=production


RUN npm install --production --force
RUN npm install -g serve
RUN npm run build
CMD ["serve -s build"]
