FROM node:17-alpine AS builder

WORKDIR /client

COPY package.json .

RUN npm install 

COPY . .

EXPOSE 3333

CMD ["npm", "start"]
