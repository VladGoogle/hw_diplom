FROM node:14 as build

ENV NODE_ENV=build

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm i

COPY . .

RUN npm run build

RUN rm -rf node_modules

FROM node:14-alpine as production


ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --only=production

COPY ./ ./

COPY --from=build /usr/src/app/dist ./dist

CMD ["npm", "run", "start:dev"]
