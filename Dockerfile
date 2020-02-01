FROM node:alpine

ARG NODE_ENV
ENV NODE_ENV "$NODE_ENV"

RUN npm --version && apk add --no-cache autoconf automake bash build-base ca-certificates curl file g++ gcc git lcms2-dev libjpeg-turbo-dev libpng-dev make nasm wget zlib-dev

WORKDIR /code

COPY package.json package-lock.json /code/
RUN npm install
RUN npm install -g backstop

COPY . code

EXPOSE 4000