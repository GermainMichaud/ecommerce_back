FROM node:lts-alpine AS install
WORKDIR /app
COPY package.json .
COPY package-lock.json .
COPY ./docker-entrypoint.sh ./docker-entrypoint.sh
RUN chmod +x ./docker-entrypoint.sh
ENTRYPOINT ["/docker-entrypoint.sh"]
RUN npm install
COPY . .

FROM node:lts-alpine AS build
WORKDIR /app
COPY --from=install /app .
RUN npm run build

FROM node:lts-alpine AS release
WORKDIR /app
COPY --from=build /app .

# Run the app
CMD ["npm", "start"]
