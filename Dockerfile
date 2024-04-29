FROM node:alpine

WORKDIR /app/lambda
COPY . .

RUN npm install

EXPOSE 8000

CMD ["node", "index.js"]