FROM node:22-slim AS dev
WORKDIR /usr/src/service
COPY package*.json ./
RUN npm install 
COPY . .

FROM node:22-slim AS build
WORKDIR /usr/src/service
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:22-slim AS production
WORKDIR /usr/src/service
COPY package*.json ./
RUN npm install --omit=dev
COPY --from=build /usr/src/service/dist ./dist
CMD npx typeorm migration:run -d dist/src/config/typeorm.js && node dist/src/main