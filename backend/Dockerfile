FROM node:20

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY package*.json .

RUN npm install --ignore-engines

ENV DB_URL=mongodb://mognodb:27017/testdb
ENV REDIS_URL=redis://redis:6379

COPY . .

EXPOSE 8000

CMD [ "npm", "run", "start:dev" ]
