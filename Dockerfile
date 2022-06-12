FROM node:16.14.2

WORKDIR /reservation_api

COPY package.json ./
COPY tsconfig.json ./

RUN yarn

COPY . .

RUN yarn build

EXPOSE 4000

ENV ENV_FILE=.env

CMD ["node", "./dist/app.js"]
