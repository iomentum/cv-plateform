FROM --platform=linux/amd64 node:alpine AS build
WORKDIR /app
COPY package.json .
RUN npm i
COPY . ./
RUN npm run build

FROM --platform=linux/amd64 nginx
COPY --from=build /app/dist /usr/share/nginx/html
COPY default.conf /etc/nginx/conf.d/default.conf