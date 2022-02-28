#Build stage

ARG PORT=8080

FROM node:14 as builder

WORKDIR /react-ui

COPY . .

RUN yarn install

RUN yarn build

#Mount on NGINX stage

FROM nginx:alpine

COPY ./nginx/nginx.conf /etc/nginx/nginx.conf

RUN rm -rf /usr/share/nginx/html/*

COPY --from=builder /react-ui/build /usr/share/nginx/html

EXPOSE 8080

ENTRYPOINT ["nginx", "-g", "daemon off;"]