FROM node:16.13.0-alpine
WORKDIR /vinylmania/webapp
COPY ./package*.json ./
RUN npm i --silent
COPY ./ ./
CMD ["npm","start"]