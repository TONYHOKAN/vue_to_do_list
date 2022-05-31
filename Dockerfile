# this is build part, if in CICD system, the build should happen in CI part, build in docker just for local test
FROM node:lts-alpine as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install 
COPY . .
ARG BUILD_ENV
RUN npm run build:${BUILD_ENV:-prod}

# production stage
FROM nginx:stable-alpine as production-stage
ADD nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build-stage /app/dist /usr/share/nginx/html
# COPY ssl.pem /etc/nginx/ssl.pem
# COPY ssl.key /etc/nginx/ssl.key
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]