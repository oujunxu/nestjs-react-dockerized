FROM node:18

# Create app directory
WORKDIR /usr/src/app/api

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY ./api/package.json ./
COPY ./api/package-lock.json ./

RUN npm install
RUN npm i bcryptjs
# If you are building your code for production
# RUN npm ci --omit=dev

# Bundle app source
COPY ./api/ .

RUN npm run build

EXPOSE 8080

CMD [ "npm", "start" ]