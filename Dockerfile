FROM node:14 as build

WORKDIR /app

COPY package*.json .

RUN npm i

RUN mv node_modules/ prod_modules/

RUN npm i

COPY . .

RUN npm run build


RUN rm -rf node_modules

FROM node:14-alpine as production

COPY --from=build /app/prod_modules ./node_modules
COPY --from=build /app/build ./build
COPY ["./package.json","./"]
COPY ./src ./src

CMD ["npm", "run", "start:dev"]
