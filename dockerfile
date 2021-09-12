FROM node:12-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . /app
CMD [ "npm", "start" ]
EXPOSE 5002