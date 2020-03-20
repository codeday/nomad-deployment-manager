FROM node:13-alpine

ENV NODE_ENV=production
RUN mkdir /www
COPY package.json /www
COPY yarn.lock /www
WORKDIR /www

RUN yarn install

COPY . /www
RUN npm run build
CMD npm run start
