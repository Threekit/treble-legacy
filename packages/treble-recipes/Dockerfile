#   React build stage
FROM node:16 as react-build

WORKDIR /app

COPY package.json /app/

RUN yarn install

COPY . /app/

RUN yarn build

CMD yarn serve