#FROM node:14-alpine3.17

#Copy the [host machine] [contianer] (paths are relative to the Dockerfile)

# Copy the package.json and package-lock.json files
#COPY package*.json ./

#RUN npm install

#COPY . .

#RUN npm run build

#EXPOSE 3000

#CMD ["npm","start"]

#-------------------------------------------

FROM node:14-alpine3.17 as nodework

WORKDIR /myapp

COPY package.json .

RUN npm install

COPY . .

RUN npm run build


FROM nginx:1.21.6-alpine
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=nodework /myapp/build .
ENTRYPOINT ["nginx","-g","daemon off;"]
