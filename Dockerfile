FROM node:alpine

WORKDIR /app/lambda
COPY . .

RUN npm install

CMD ["node", "index.js"]