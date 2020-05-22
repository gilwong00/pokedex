FROM node:12.18.0
WORKDIR "/app"
COPY ./package.json ./
RUN yarn
COPY ./ ./
CMD ["yarn", "dev"]
