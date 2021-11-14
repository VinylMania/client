FROM node:14.17.5-alpine
WORKDIR /vinylmania/react
COPY ./package*.json ./
RUN npm i
COPY . .
CMD npm start