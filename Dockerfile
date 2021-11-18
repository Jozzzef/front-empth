#build react app
FROM node:16.13.0-alpine AS build-stage

WORKDIR /usr/src/empathy-frontend

COPY package.json .
COPY package-lock.json .

RUN npm install

COPY . .

RUN npm run build


FROM nginx:1.21-alpine

#put build in the root directory so the nginx config can find it (see server block in our custom nginx.conf in source code)

COPY --from=build-stage /usr/src/empathy-frontend/build /usr/share/react

#change the conf file
COPY nginx.conf /etc/nginx/nginx.conf

#this is basically just notation; use -p 4200:80 in run command
EXPOSE 4200

CMD ["nginx", "-g", "daemon off;"]