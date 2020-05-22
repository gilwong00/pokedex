FROM node:12.16.2
WORKDIR "/pokedex"
COPY ./package.json ./
RUN yarn
COPY ./ ./
CMD ["yarn", "dev"]
