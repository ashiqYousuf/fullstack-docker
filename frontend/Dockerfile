FROM node:20


RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY package*.json .

RUN npm install --ignore-engines

ENV BACKEND_URL=http://backend:8000/ping

COPY . .

EXPOSE 5173

CMD [ "npm", "run", "dev" ]
