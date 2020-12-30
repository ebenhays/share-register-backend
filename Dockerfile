FROM node:current-slim
ENV NODE_ENV production
WORKDIR /usr/src/app
COPY package.json .
RUN npm install
COPY . .
# RUN npm run migrate
# RUN npm run seed
EXPOSE 3000
ENTRYPOINT ["npm","start"]
