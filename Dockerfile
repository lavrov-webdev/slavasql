FROM node:16-alpine

WORKDIR /app 

COPY . /app 

RUN yarn install && yarn build && yarn cache clean

EXPOSE 3000

CMD ["node", "server.cjs"]
