FROM node:14.17.0 as base

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:14.17.0
WORKDIR /app
COPY package.json .
RUN npm install --only=production
COPY --from=base /app/dist ./dist
CMD npm run start:prod