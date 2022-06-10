FROM node:alpine AS build
WORKDIR src/app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build --omit=dev

### STAGE 2: Run ###
FROM nginx:alpine
COPY --from=build src/app/dist/homeserver-fe /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf