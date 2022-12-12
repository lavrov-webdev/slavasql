FROM node:16-alpine

WORKDIR /app 

COPY package.json .

RUN yarn install

COPY . /app 

RUN  yarn build && yarn cache clean

EXPOSE 3000

CMD ["node", "server.cjs"]
