# Image source
FROM node:14.21.3-slim

# Docker working directory
WORKDIR /app

# Copying file into APP directory of docker
COPY ./package.json ./package-lock.json /app/

# Then install the NPM module
RUN npm install && npm install bcrypt

# Copy current directory to APP folder
COPY . /app/

EXPOSE 3000
CMD ["npm", "run", "start:dev"]
