#Using alpine as buster is far bigger
FROM node:16-alpine as base

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn --frozen-lockfile

COPY . .

FROM base as build

#test and build
RUN yarn test
RUN yarn build

#clean unnecesary dependencies and files in node_modules
RUN npm prune --production
RUN yarn autoclean --force

FROM node:16-alpine as production

WORKDIR /app

COPY --from=build /app/dist dist
COPY --from=build /app/prod.env prod.env
COPY --from=build /app/node_modules node_modules