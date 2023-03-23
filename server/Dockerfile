FROM node:16.14.2

RUN mkdir -p /usr/src/app

COPY ./package*.json /usr/src/app/

WORKDIR /usr/src/app

COPY . /usr/src/app

CMD npm start
